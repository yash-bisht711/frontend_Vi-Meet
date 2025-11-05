// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { leaveRoom, getChatHistory } from "../Utils/api";
// import { createSocket } from "../Utils/socket";
// import useWebRTC from "../hooks/useWebRTC";
// import { motion } from "framer-motion";

// export default function Room() {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [socket, setSocket] = useState(null);

//   // Chat state
//   const [chat, setChat] = useState([]);
//   const [msg, setMsg] = useState("");
//   const chatEndRef = useRef(null);

//   // WebRTC hook
//   const { localVideoRef, peers, initLocalMedia, toggleMic, toggleCam, startScreenShare } =
//     useWebRTC(socket, roomId);

//   useEffect(() => {
//     if (!token) return navigate("/login");
//     const s = createSocket(token);
//     setSocket(s);
//     s.emit("room:join", { roomId });
//     initLocalMedia();

//     // Load previous messages
//     (async () => {
//       const data = await getChatHistory(roomId);
//       setChat(data.messages || []);
//     })();

//     // Chat events
//     s.on("chat:new", (m) => setChat((prev) => [...prev, m]));

//     return () => {
//       s.emit("room:leave", { roomId });
//       s.disconnect();
//     };
//   }, [roomId, token, navigate, initLocalMedia]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const sendMessage = () => {
//     if (!msg.trim()) return;
//     socket.emit("chat:send", { roomId, message: msg.trim() });
//     setMsg("");
//   };

//   const onLeave = async () => {
//     await leaveRoom(roomId);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
//         {/* Video Area */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="md:col-span-2 bg-gray-900/80 rounded-2xl p-4 shadow-lg border border-gray-700"
//         >
//           <h1 className="text-xl font-bold mb-3 text-center">Room: {roomId}</h1>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//             {/* Local video */}
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               playsInline
//               className="w-full h-48 bg-black rounded-xl object-cover border border-gray-700 shadow"
//             />
//             {peers.map((p) => (
//               <motion.video
//                 key={p.id}
//                 autoPlay
//                 playsInline
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="w-full h-48 bg-black rounded-xl object-cover border border-gray-700 shadow"
//                 ref={(el) => {
//                   if (el && p.stream && el.srcObject !== p.stream) el.srcObject = p.stream;
//                 }}
//               />
//             ))}
//           </div>

//           {/* Controls */}
//           <div className="flex flex-wrap gap-3 justify-center mt-4">
//             <button onClick={toggleMic} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition">
//               🎤 Mic
//             </button>
//             <button onClick={toggleCam} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition">
//               🎥 Cam
//             </button>
//             <button onClick={startScreenShare} className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition">
//               🖥️ Share
//             </button>
//             <button
//               onClick={() => navigator.clipboard?.writeText(window.location.href)}
//               className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
//             >
//               🔗 Copy Link
//             </button>
//             <button onClick={onLeave} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition">
//               🚪 Leave
//             </button>
//           </div>
//         </motion.div>

//         {/* Chat Area */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-gray-900/90 rounded-2xl shadow-lg p-4 flex flex-col h-[75vh] border border-gray-700"
//         >
//           <h2 className="font-semibold mb-3 text-lg">💬 Room Chat</h2>
//           <div className="flex-1 overflow-y-auto space-y-3 custom-scroll pr-1">
//             {chat.map((m) => (
//               <motion.div
//                 key={m._id || Math.random()}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-gray-800 rounded-xl px-4 py-2 text-sm shadow"
//               >
//                 <p className="font-medium text-blue-400">{m?.sender?.name || "User"}</p>
//                 <p className="text-gray-200">{m.message}</p>
//               </motion.div>
//             ))}
//             <div ref={chatEndRef} />
//           </div>
//           <div className="flex gap-2 mt-3">
//             <input
//               className="flex-1 border border-gray-700 bg-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Type a message..."
//               value={msg}
//               onChange={(e) => setMsg(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
//             >
//               ➤
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { leaveRoom, getChatHistory } from "../Utils/api";
// import { createSocket } from "../Utils/socket";
// import useWebRTC from "../hooks/useWebRTC";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiMic, FiVideo, FiShare2, FiLogOut, FiMessageCircle } from "react-icons/fi";

// export default function Room() {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const [socket, setSocket] = useState(null);

//   const [chat, setChat] = useState([]);
//   const [msg, setMsg] = useState("");
//   const chatEndRef = useRef(null);

//   const { localVideoRef, peers, initLocalMedia, toggleMic, toggleCam, startScreenShare } =
//     useWebRTC(socket, roomId);

//   const [showControls, setShowControls] = useState(false);
//   const [showChat, setShowChat] = useState(false);

//   useEffect(() => {
//     if (!token) return navigate("/login");
//     const s = createSocket(token);
//     setSocket(s);
//     s.emit("room:join", { roomId });
//     initLocalMedia();

//     (async () => {
//       const data = await getChatHistory(roomId);
//       setChat(data.messages || []);
//     })();

//     s.on("chat:new", (m) => setChat((prev) => [...prev, m]));

//     return () => {
//       s.emit("room:leave", { roomId });
//       s.disconnect();
//     };
//   }, [roomId, token, navigate, initLocalMedia]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const sendMessage = () => {
//     if (!msg.trim()) return;
//     socket.emit("chat:send", { roomId, message: msg.trim() });
//     setMsg("");
//   };

//   const onLeave = async () => {
//     await leaveRoom(roomId);
//     navigate("/dashboard");
//   };

//   // Compute video grid columns dynamically
//   const totalParticipants = peers.length + 1; // +1 for local video
//   const getGridCols = () => {
//     if (totalParticipants === 1) return "grid-cols-1";
//     if (totalParticipants === 2) return "grid-cols-2";
//     if (totalParticipants <= 4) return "grid-cols-2 md:grid-cols-2";
//     if (totalParticipants <= 6) return "grid-cols-2 md:grid-cols-3";
//     return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
//   };

//   return (
//     <div
//       className="min-h-screen bg-gray-900 text-white relative"
//       onMouseMove={() => setShowControls(true)}
//       onMouseLeave={() => setShowControls(false)}
//       onTouchStart={() => setShowControls(true)}
//     >
//       {/* Video Area */}
//       <div className={`grid ${getGridCols()} gap-3 p-3`}>
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className="w-full h-full md:h-[40vh] lg:h-[50vh] bg-black rounded-xl object-cover border border-gray-700 shadow"
//         />
//         {peers.map((p) => (
//           <video
//             key={p.id}
//             autoPlay
//             playsInline
//             className="w-full h-full md:h-[40vh] lg:h-[50vh] bg-black rounded-xl object-cover border border-gray-700 shadow"
//             ref={(el) => {
//               if (el && p.stream && el.srcObject !== p.stream) el.srcObject = p.stream;
//             }}
//           />
//         ))}
//       </div>

//       {/* Hover Controls */}
//       <AnimatePresence>
//         {showControls && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 bg-gray-800/70 p-3 rounded-xl shadow-lg backdrop-blur-sm"
//           >
//             <button onClick={toggleMic} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
//               <FiMic size={20} />
//             </button>
//             <button onClick={toggleCam} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
//               <FiVideo size={20} />
//             </button>
//             <button onClick={startScreenShare} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
//               <FiShare2 size={20} />
//             </button>
//             <button onClick={onLeave} className="p-3 rounded-full bg-red-600 hover:bg-red-700">
//               <FiLogOut size={20} />
//             </button>
//             <button
//               onClick={() => setShowChat((prev) => !prev)}
//               className="p-3 rounded-full bg-blue-600 hover:bg-blue-500"
//             >
//               <FiMessageCircle size={20} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Chat Window */}
//       <AnimatePresence>
//         {showChat && (
//           <motion.div
//             initial={{ x: 300, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: 300, opacity: 0 }}
//             className="absolute right-0 top-0 h-full w-80 bg-gray-900/95 shadow-xl flex flex-col p-4"
//           >
//             <h2 className="font-semibold mb-3 text-lg">💬 Room Chat</h2>
//             <div className="flex-1 overflow-y-auto space-y-3 pr-1">
//               {chat.map((m) => (
//                 <div key={m._id || Math.random()} className="bg-gray-800 rounded-xl px-4 py-2 text-sm shadow">
//                   <p className="font-medium text-blue-400">{m?.sender?.name || "User"}</p>
//                   <p className="text-gray-200">{m.message}</p>
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </div>
//             <div className="flex gap-2 mt-3">
//               <input
//                 className="flex-1 border border-gray-700 bg-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type a message..."
//                 value={msg}
//                 onChange={(e) => setMsg(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               />
//               <button
//                 onClick={sendMessage}
//                 className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
//               >
//                 ➤
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { leaveRoom, getChatHistory } from "../Utils/api";
import { createSocket } from "../Utils/socket";
import useWebRTC from "../hooks/useWebRTC";
import { motion, AnimatePresence } from "framer-motion";
import { FiMic, FiVideo, FiShare2, FiLogOut, FiMessageCircle } from "react-icons/fi";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [socket, setSocket] = useState(null);

  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const chatEndRef = useRef(null);

  const { localVideoRef, peers, initLocalMedia, toggleMic, toggleCam, startScreenShare } =
    useWebRTC(socket, roomId);

  const [showControls, setShowControls] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (!token) return navigate("/login");
    const s = createSocket(token);
    setSocket(s);
    s.emit("room:join", { roomId });
    initLocalMedia();

    (async () => {
      const data = await getChatHistory(roomId);
      setChat(data.messages || []);
    })();

    s.on("chat:new", (m) => setChat((prev) => [...prev, m]));

    return () => {
      s.emit("room:leave", { roomId });
      s.disconnect();
    };
  }, [roomId, token, navigate, initLocalMedia]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    socket.emit("chat:send", { roomId, message: msg.trim() });
    setMsg("");
  };

  const onLeave = async () => {
    await leaveRoom(roomId);
    navigate("/dashboard");
  };

  // calculate best grid (rows x cols) like Zoom
  const totalParticipants = peers.length + 1;
  const getGrid = () => {
    if (totalParticipants <= 1) return "grid-cols-1 grid-rows-1";
    if (totalParticipants === 2) return "grid-cols-2 grid-rows-1";
    if (totalParticipants <= 4) return "grid-cols-2 grid-rows-2";
    if (totalParticipants <= 6) return "grid-cols-3 grid-rows-2";
    if (totalParticipants <= 9) return "grid-cols-3 grid-rows-3";
    if (totalParticipants <= 12) return "grid-cols-4 grid-rows-3";
    return "grid-cols-4 grid-rows-4";
  };

  return (
    <div
      className="w-screen h-screen bg-black text-white relative overflow-hidden"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onTouchStart={() => setShowControls(true)}
      onClick={()=>setShowControls(!showControls)}
    >
      {/* Video Grid */}
      <div className={`grid ${getGrid()} gap-1 w-full h-full`}>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full bg-black object-cover"
        />
        {peers.map((p) => (
          <video
            key={p.id}
            autoPlay
            playsInline
            className="w-full h-full bg-black object-cover"
            ref={(el) => {
              if (el && p.stream && el.srcObject !== p.stream) el.srcObject = p.stream;
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 bg-gray-800/70 p-3 rounded-xl shadow-lg backdrop-blur-sm"
          >
            <button onClick={toggleMic} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <FiMic size={20} />
            </button>
            <button onClick={toggleCam} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
              <FiVideo size={20} />
            </button>
            <button
              onClick={startScreenShare}
              className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              <FiShare2 size={20} />
            </button>
            <button onClick={onLeave} className="p-3 rounded-full bg-red-600 hover:bg-red-700">
              <FiLogOut size={20} />
            </button>
            <button
              onClick={() => setShowChat((prev) => !prev)}
              className="p-3 rounded-full bg-blue-600 hover:bg-blue-500"
            >
              <FiMessageCircle size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute right-0 top-0 h-full w-80 bg-gray-900/95 shadow-xl flex flex-col p-4"
          >
            <h2 className="font-semibold mb-3 text-lg">💬 Room Chat</h2>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {chat.map((m) => (
                <div
                  key={m._id || Math.random()}
                  className="bg-gray-800 rounded-xl px-4 py-2 text-sm shadow"
                >
                  <p className="font-medium text-blue-400">{m?.sender?.name || "User"}</p>
                  <p className="text-gray-200">{m.message}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="flex gap-2 mt-3">
              <input
                className="flex-1 border border-gray-700 bg-gray-800 text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

