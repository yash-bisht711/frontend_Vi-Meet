import { useCallback, useEffect, useRef, useState } from "react";

const ICE_CONFIG = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export default function useWebRTC(socket, roomId) {
  const [peers, setPeers] = useState([]); // [{ id, stream }]
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const pcBySocket = useRef(new Map());

  const addPeer = useCallback((socketId, createOffer) => {
    if (pcBySocket.current.has(socketId)) return pcBySocket.current.get(socketId);

    const pc = new RTCPeerConnection(ICE_CONFIG);

    // Forward local tracks
    localStreamRef.current?.getTracks().forEach((track) => {
      pc.addTrack(track, localStreamRef.current);
    });

    pc.ontrack = (e) => {
      const [remoteStream] = e.streams;
      setPeers((prev) => {
        const exists = prev.find((p) => p.id === socketId);
        if (exists) return prev.map((p) => (p.id === socketId ? { ...p, stream: remoteStream } : p));
        return [...prev, { id: socketId, stream: remoteStream }];
      });
    };

    pc.onicecandidate = (e) => {
      if (e.candidate) socket.emit("webrtc:ice", { roomId, to: socketId, candidate: e.candidate });
    };

    pc.onconnectionstatechange = () => {
      if (["failed", "disconnected", "closed"].includes(pc.connectionState)) {
        setPeers((prev) => prev.filter((p) => p.id !== socketId));
        pcBySocket.current.delete(socketId);
      }
    };

    pcBySocket.current.set(socketId, pc);

    if (createOffer) {
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          socket.emit("webrtc:offer", { roomId, to: socketId, sdp: pc.localDescription });
        });
    }

    return pc;
  }, [roomId, socket]);

  const removePeer = useCallback((socketId) => {
    setPeers((prev) => prev.filter((p) => p.id !== socketId));
    const pc = pcBySocket.current.get(socketId);
    if (pc) pc.close();
    pcBySocket.current.delete(socketId);
  }, []);

  const initLocalMedia = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
  }, []);

  // Socket signaling wiring
  useEffect(() => {
    if (!socket) return;

    const onPeers = ({ peers }) => {
      peers.forEach((peerId) => addPeer(peerId, true)); // create offer to existing peers
    };
    const onPeerJoin = ({ socketId }) => {
      addPeer(socketId, false); // wait for their offer
    };
    const onOffer = async ({ from, sdp }) => {
      const pc = addPeer(from, false);
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("webrtc:answer", { roomId, to: from, sdp: pc.localDescription });
    };
    const onAnswer = async ({ from, sdp }) => {
      const pc = pcBySocket.current.get(from);
      if (!pc) return;
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    };
    const onIce = async ({ from, candidate }) => {
      const pc = pcBySocket.current.get(from);
      if (!pc || !candidate) return;
      try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch {}
    };
    const onLeave = ({ socketId }) => removePeer(socketId);

    socket.on("room:peers", onPeers);
    socket.on("peer:join", onPeerJoin);
    socket.on("webrtc:offer", onOffer);
    socket.on("webrtc:answer", onAnswer);
    socket.on("webrtc:ice", onIce);
    socket.on("peer:leave", onLeave);

    return () => {
      socket.off("room:peers", onPeers);
      socket.off("peer:join", onPeerJoin);
      socket.off("webrtc:offer", onOffer);
      socket.off("webrtc:answer", onAnswer);
      socket.off("webrtc:ice", onIce);
      socket.off("peer:leave", onLeave);
    };
  }, [socket, addPeer, removePeer, roomId]);

  // Cleanup
  useEffect(() => () => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    pcBySocket.current.forEach((pc) => pc.close());
    pcBySocket.current.clear();
  }, []);

  // Controls
  const toggleMic = () => {
    const tracks = localStreamRef.current?.getAudioTracks();
    if (tracks && tracks[0]) tracks[0].enabled = !tracks[0].enabled;
  };

  const toggleCam = () => {
    const tracks = localStreamRef.current?.getVideoTracks();
    if (tracks && tracks[0]) tracks[0].enabled = !tracks[0].enabled;
  };

  const startScreenShare = async () => {
    const display = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const videoTrack = display.getVideoTracks()[0];
    // Replace outgoing video tracks
    pcBySocket.current.forEach((pc) => {
      const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
      if (sender) sender.replaceTrack(videoTrack);
    });
    // Show locally
    const localVideo = localVideoRef.current;
    const newStream = new MediaStream([videoTrack, ...localStreamRef.current.getAudioTracks()]);
    localVideo.srcObject = newStream;

    videoTrack.onended = () => {
      const cam = localStreamRef.current.getVideoTracks()[0];
      pcBySocket.current.forEach((pc) => {
        const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
        if (sender) sender.replaceTrack(cam);
      });
      localVideo.srcObject = localStreamRef.current;
    };
  };

  return { localVideoRef, peers, initLocalMedia, toggleMic, toggleCam, startScreenShare };
}
