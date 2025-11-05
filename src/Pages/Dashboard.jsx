// import { useEffect, useState } from "react";
// import { createRoom, joinRoom, myRooms, endRoom } from "../Utils/api";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Dashboard() {
//   const [joinId, setJoinId] = useState("");
//   const [rooms, setRooms] = useState([]);
//   const [status, setStatus] = useState("");
//   const navigate = useNavigate();

//   const loadRooms = async () => {
//     const res = await myRooms();
//     setRooms(res.rooms || []);
//   };

//   useEffect(() => {
//     loadRooms();
//   }, []);

//   const handleCreate = async () => {
//     setStatus("Creating room…");
//     const res = await createRoom();
//     if (res.roomId) {
//       const link = `${window.location.origin}/room/${res.roomId}`;
//       navigator.clipboard?.writeText(link);
//       setStatus(`Room created: ${res.roomId} (link copied)`);
//       navigate(`/room/${res.roomId}`);
//     } else {
//       setStatus(res.message || "Failed to create room");
//     }
//   };

//   const handleJoin = async () => {
//     if (!joinId.trim()) return setStatus("Enter a room ID");
//     setStatus("Joining…");
//     const res = await joinRoom(joinId.trim());
//     if (res.ok) {
//       setStatus("Joined!");
//       navigate(`/room/${joinId.trim()}`);
//     } else {
//       setStatus(res.message || "Failed to join");
//     }
//   };

//   const handleEnd = async (roomId) => {
//     const res = await endRoom(roomId);
//     if (res.ok) {
//       setStatus(`Ended room ${roomId}`);
//       loadRooms();
//     } else {
//       setStatus(res.message || "Failed to end room");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8">
//       <div className="max-w-3xl mx-auto space-y-8">
//         {/* Header */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl font-extrabold text-gray-800 text-center"
//         >
//           🚀 Meeting Dashboard
//         </motion.h1>

//         {/* Create / Join */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//           className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
//         >
//           <button
//             onClick={handleCreate}
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
//           >
//             ➕ Create Meeting
//           </button>

//           <div className="flex gap-2">
//             <input
//               className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Room ID"
//               value={joinId}
//               onChange={(e) => setJoinId(e.target.value)}
//             />
//             <button
//               onClick={handleJoin}
//               className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:opacity-90 transition"
//             >
//               Join
//             </button>
//           </div>

//           {status && (
//             <p className="text-sm text-gray-600 italic">{status}</p>
//           )}
//         </motion.div>

//         {/* Recent Rooms */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white p-6 rounded-2xl shadow-lg"
//         >
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">
//             📋 Recent Rooms
//           </h2>
//           <div className="space-y-3">
//             {rooms.length === 0 && (
//               <p className="text-sm text-gray-500">
//                 No recent rooms
//               </p>
//             )}
//             {rooms.map((r) => (
//               <motion.div
//                 key={r._id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex items-center justify-between border rounded-xl px-4 py-3 hover:shadow-md transition"
//               >
//                 <div>
//                   <p className="font-medium text-gray-800">{r.roomId}</p>
//                   <p className="text-xs text-gray-500">
//                     {r.active ? "🟢 Active" : "⚪ Ended"} • Participants:{" "}
//                     {r.participants?.length || 0}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() =>
//                       navigator.clipboard?.writeText(
//                         `${window.location.origin}/room/${r.roomId}`
//                       )
//                     }
//                     className="text-sm px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
//                   >
//                     Copy Link
//                   </button>
//                   <button
//                     onClick={() => navigate(`/room/${r.roomId}`)}
//                     className="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//                   >
//                     Open
//                   </button>
//                   {r.active && (
//                     <button
//                       onClick={() => handleEnd(r.roomId)}
//                       className="text-sm px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
//                     >
//                       End
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

//..................................................................................................

// import { useEffect, useState } from "react";
// import { createRoom, joinRoom, myRooms, endRoom, scheduleMeeting } from "../Utils/api";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Dashboard() {
//   const [joinId, setJoinId] = useState("");
//   const [rooms, setRooms] = useState([]);
//   const [status, setStatus] = useState("");
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [scheduleTime, setScheduleTime] = useState("");
//   const navigate = useNavigate();

//   const loadRooms = async () => {
//     const res = await myRooms();
//     setRooms(res.rooms || []);
//   };

//   useEffect(() => {
//     loadRooms();
//   }, []);

//   const handleStartNow = async () => {
//     setStatus("Creating room…");
//     const res = await createRoom();
//     if (res.roomId) {
//       const link = `${window.location.origin}/room/${res.roomId}`;
//       navigator.clipboard?.writeText(link);
//       setStatus(`Room created: ${res.roomId} (link copied)`);
//       navigate(`/room/${res.roomId}`);
//     } else {
//       setStatus(res.message || "Failed to create room");
//     }
//     setShowCreateModal(false);
//   };

//   const handleSchedule = async () => {
//     if (!scheduleTime) return setStatus("Pick a date & time");
//     setStatus("Scheduling meeting…");
//     const res = await scheduleMeeting(scheduleTime);
//     if (res.ok) {
//       setStatus("Meeting scheduled & added to calendar ✅");
//       loadRooms();
//     } else {
//       setStatus(res.message || "Failed to schedule");
//     }
//     setShowCreateModal(false);
//   };

//   const handleJoin = async () => {
//     if (!joinId.trim()) return setStatus("Enter a room ID");
//     setStatus("Joining…");
//     const res = await joinRoom(joinId.trim());
//     if (res.ok) {
//       setStatus("Joined!");
//       navigate(`/room/${joinId.trim()}`);
//     } else {
//       setStatus(res.message || "Failed to join");
//     }
//   };

//   const handleEnd = async (roomId) => {
//     const res = await endRoom(roomId);
//     if (res.ok) {
//       setStatus(`Ended room ${roomId}`);
//       loadRooms();
//     } else {
//       setStatus(res.message || "Failed to end room");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8">
//       <div className="max-w-3xl mx-auto space-y-8">
//         {/* Header */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl font-extrabold text-gray-800 text-center"
//         >
//           🚀 Meeting Dashboard
//         </motion.h1>

//         {/* Create / Join */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.4 }}
//           className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
//         >
//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
//           >
//             ➕ Create Meeting
//           </button>

//           <div className="flex gap-2">
//             <input
//               className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Room ID"
//               value={joinId}
//               onChange={(e) => setJoinId(e.target.value)}
//             />
//             <button
//               onClick={handleJoin}
//               className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:opacity-90 transition"
//             >
//               Join
//             </button>
//           </div>

//           {status && <p className="text-sm text-gray-600 italic">{status}</p>}
//         </motion.div>

//         {/* Recent Rooms */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white p-6 rounded-2xl shadow-lg"
//         >
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">
//             📋 Recent Rooms
//           </h2>
//           <div className="space-y-3">
//             {rooms.length === 0 && (
//               <p className="text-sm text-gray-500">No recent rooms</p>
//             )}
//             {rooms.map((r) => (
//               <motion.div
//                 key={r._id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex items-center justify-between border rounded-xl px-4 py-3 hover:shadow-md transition"
//               >
//                 <div>
//                   <p className="font-medium text-gray-800">{r.roomId}</p>
//                   <p className="text-xs text-gray-500">
//                     {r.active ? "🟢 Active" : "⚪ Ended"} • Participants:{" "}
//                     {r.participants?.length || 0}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() =>
//                       navigator.clipboard?.writeText(
//                         `${window.location.origin}/room/${r.roomId}`
//                       )
//                     }
//                     className="text-sm px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
//                   >
//                     Copy Link
//                   </button>
//                   <button
//                     onClick={() => navigate(`/room/${r.roomId}`)}
//                     className="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//                   >
//                     Open
//                   </button>
//                   {r.active && (
//                     <button
//                       onClick={() => handleEnd(r.roomId)}
//                       className="text-sm px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
//                     >
//                       End
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Create Meeting Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 w-96 space-y-4">
//             <h2 className="text-xl font-bold text-gray-800">Create Meeting</h2>

//             <button
//               onClick={handleStartNow}
//               className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//             >
//               🚀 Start Now
//             </button>

//             <div className="space-y-2">
//               <label className="block text-sm text-gray-600">
//                 Schedule for later
//               </label>
//               <input
//                 type="datetime-local"
//                 className="w-full border rounded-lg px-3 py-2"
//                 value={scheduleTime}
//                 onChange={(e) => setScheduleTime(e.target.value)}
//               />
//               <button
//                 onClick={handleSchedule}
//                 className="w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
//               >
//                 📅 Schedule Meeting
//               </button>
//             </div>

//             <button
//               onClick={() => setShowCreateModal(false)}
//               className="w-full py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//...........-----------------------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { createRoom, joinRoom, myRooms, endRoom } from "../Utils/api";
import axiosInstance from "../Utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboard() {
  const [joinId, setJoinId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    email: "",
    topic: "",
    description: "",
    date: "",
    time: "",
  });

 //const notifySuccessSchedule = () => toast("Meeting scheduled! Invite sent 📩");
  //const notifyFailedSchedule = () => toast("Meeting scheduled failed! Invite not sent ❌");
  const notify = (text) => toast(`${text}`)

  const navigate = useNavigate();

  const loadRooms = async () => {
    const res = await myRooms();
    setRooms(res.rooms || []);
  };

  useEffect(() => {
    loadRooms();
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // cleanup when unmount
  }, []);

  // Instant Meeting
  const handleCreateInstant = async () => {
    setStatus("Creating room…");
    const res = await createRoom();
    if (res.roomId) {
      const link = `${window.location.origin}/room/${res.roomId}`;
      navigator.clipboard?.writeText(link);
      setStatus(`Room created: ${res.roomId} (link copied)`);
      navigate(`/room/${res.roomId}`);
    } else {
      setStatus(res.message || "Failed to create room");
    }
  };

  // Scheduled Meeting
  const handleSchedule = async () => {
    try {
      setStatus("Scheduling meeting…");
      const res = await axiosInstance.post("/meetings/schedule", scheduleData);

      if (res.data?.roomId) {
        // notifySuccessSchedule()
        notify("Meeting scheduled! Invite sent 📩")
        setShowSchedule(false);
        setScheduleData({
          email: "",
          topic: "",
          description: "",
          date: "",
          time: "",
        });
      } else {
        setStatus("Failed to schedule");
        //notifyFailedSchedule()
        notify("Meeting scheduled failed! Invite not sent ❌")
      }
    } catch (err) {
      setStatus(err.response?.data?.msg || "Error scheduling meeting");
      notify(err)
    }
  };

  const handleJoin = async () => {
    if (!joinId.trim()) return setStatus("Enter a room ID");
    setStatus("Joining…");
    const res = await joinRoom(joinId.trim());
    if (res.ok) {
      setStatus("Joined!");
      navigate(`/room/${joinId.trim()}`);
    } else {
      setStatus(res.message || "Failed to join");
    }
  };

  const handleEnd = async (roomId) => {
    const res = await endRoom(roomId);
    if (res.ok) {
      setStatus(`Ended room ${roomId}`);
      loadRooms();
    } else {
      setStatus(res.message || "Failed to end room");
    }
  };

  return (
    <>
      {/* Host Info + Clock */}
      <div className="bg-gray-100 p-6 rounded-lg shadow flex justify-between">
        <div>
          <h1 className="text-2xl text-yellow-600 font-bold">
            Welcome, {user?.name || "Host"}
          </h1>
          <p className="text-gray-700">{user?.email || "No email"}</p>
        </div>
        <div className="text-xl font-mono">
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-800 text-center"
        >
          🚀 Meeting Dashboard
        </motion.h1>

        {/* Create / Join */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >
          <div className="flex gap-3">
            <button
              onClick={handleCreateInstant}
              className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            >
              ⚡ Start Instant Meeting
            </button>
            <button
              onClick={() => setShowSchedule(true)}
              className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:opacity-90 transition"
            >
              📅 Schedule Meeting
            </button>
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter Room ID"
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
            />
            <button
              onClick={handleJoin}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:opacity-90 transition"
            >
              Join
            </button>
          </div>

          {status && <p className="text-sm text-gray-600 italic">{status}</p>}
        </motion.div>

        {/* Recent Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700">📋 Recent Rooms</h2>
          <div className="space-y-3">
            {rooms.length === 0 && (
              <p className="text-sm text-gray-500">No recent rooms</p>
            )}
            {rooms.map((r) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between border rounded-xl px-4 py-3 hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{r.roomId}</p>
                  <p className="text-xs text-gray-500">
                    {r.active ? "🟢 Active" : "⚪ Ended"} • Participants:{" "}
                    {r.participants?.length || 0}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigator.clipboard?.writeText(
                        `${window.location.origin}/room/${r.roomId}`
                      )
                    }
                    className="text-sm px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => navigate(`/room/${r.roomId}`)}
                    className="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Open
                  </button>
                  {r.active && (
                    <button
                      onClick={() => handleEnd(r.roomId)}
                      className="text-sm px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      End
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Schedule Meeting Modal */}
      {showSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-bold">📅 Schedule a Meeting</h2>
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Invitee Email"
              value={scheduleData.email}
              onChange={(e) => setScheduleData({ ...scheduleData, email: e.target.value })}
            />
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Topic"
              value={scheduleData.topic}
              onChange={(e) => setScheduleData({ ...scheduleData, topic: e.target.value })}
            />
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Description"
              value={scheduleData.description}
              onChange={(e) => setScheduleData({ ...scheduleData, description: e.target.value })}
            />
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
              value={scheduleData.date}
              onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
            />
            <input
              type="time"
              className="w-full border rounded-lg px-3 py-2"
              value={scheduleData.time}
              onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSchedule(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <ToastContainer />
    </>
  );
}

