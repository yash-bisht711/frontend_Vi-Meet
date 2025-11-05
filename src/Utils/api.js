// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// console.log(API_URL)

// const authHeaders = () => {
//   const token = localStorage.getItem("token");
//   return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
// };

// export const signup = async (data) => {
//   const res = await fetch(`${API_URL}/auth/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
//   return res.json();
// };

// export const login = async (data) => {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
//   return res.json();
// };

// // Rooms
// export const createRoom = async () => {
//   const res = await fetch(`${API_URL}/rooms/create`, {
//     method: "POST",
//     headers: authHeaders()
//   });
//   return res.json();
// };

// export const joinRoom = async (roomId) => {
//   const res = await fetch(`${API_URL}/rooms/join`, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify({ roomId })
//   });
//   return res.json();
// };

// export const leaveRoom = async (roomId) => {
//   const res = await fetch(`${API_URL}/rooms/leave`, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify({ roomId })
//   });
//   return res.json();
// };

// export const endRoom = async (roomId) => {
//   const res = await fetch(`${API_URL}/rooms/end`, {
//     method: "POST",
//     headers: authHeaders(),
//     body: JSON.stringify({ roomId })
//   });
//   return res.json();
// };

// export const myRooms = async () => {
//   const res = await fetch(`${API_URL}/rooms/mine`, { headers: authHeaders() });
//   return res.json();
// };

// // Chat history
// export const getChatHistory = async (roomId) => {
//   const res = await fetch(`${API_URL}/chat/${roomId}`, { headers: authHeaders() });
//   return res.json();
// };

// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// console.log("API_URL:", API_URL);

// // Attach token headers
// const authHeaders = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // Axios instance
// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ---------- AUTH ----------
// export const signup = async (data) => {
//   const res = await axiosInstance.post("/auth/signup", data);
//   return res.data;
// };

// export const login = async (data) => {
//   const res = await axiosInstance.post("/auth/login", data);
//   return res.data;
// };

// // ---------- ROOMS ----------
// export const createRoom = async () => {
//   const res = await axiosInstance.post("/rooms/create", {}, authHeaders());
//   return res.data;
// };

// export const joinRoom = async (roomId) => {
//   const res = await axiosInstance.post("/rooms/join", { roomId }, authHeaders());
//   return res.data;
// };

// export const leaveRoom = async (roomId) => {
//   const res = await axiosInstance.post("/rooms/leave", { roomId }, authHeaders());
//   return res.data;
// };

// export const endRoom = async (roomId) => {
//   const res = await axiosInstance.post("/rooms/end", { roomId }, authHeaders());
//   return res.data;
// };

// export const myRooms = async () => {
//   const res = await axiosInstance.get("/rooms/mine", authHeaders());
//   return res.data;
// };

// // ---------- CHAT ----------
// export const getChatHistory = async (roomId) => {
//   const res = await axiosInstance.get(`/chat/${roomId}`, authHeaders());
//   return res.data;
// };

// api.js

//................................................................................................
// api.js
import axios from "axios";

// Set base API URL from environment or fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
console.log("API_URL:", API_URL);

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach token on each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// -------------------- AUTH --------------------

export const signup = async (data) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  if (res.data?.token) localStorage.setItem("token", res.data.token);
  return res.data;
};


// -------------------- ROOMS --------------------

export const createRoom = async () => {
  const res = await axiosInstance.post("/rooms/create");
  return res.data;
};

export const joinRoom = async (roomId) => {
  const res = await axiosInstance.post("/rooms/join", { roomId });
  return res.data;
};

export const leaveRoom = async (roomId) => {
  const res = await axiosInstance.post("/rooms/leave", { roomId });
  return res.data;
};

export const endRoom = async (roomId) => {
  const res = await axiosInstance.post("/rooms/end", { roomId });
  return res.data;
};

export const myRooms = async () => {
  const res = await axiosInstance.get("/rooms/mine");
  return res.data;
};


// -------------------- CHAT --------------------

export const getChatHistory = async (roomId) => {
  const res = await axiosInstance.get(`/chat/${roomId}`);
  return res.data;
};


// -------------------- MEETINGS --------------------

export const scheduleMeeting = async (data) => {
  const res = await axiosInstance.post("/meetings/schedule", data);
  return res.data;
};

export const myMeetings = async () => {
  const res = await axiosInstance.get("/meetings/mine");
  return res.data;
};

export const updateMeeting = async (meetingId, data) => {
  const res = await axiosInstance.put(`/meetings/update/${meetingId}`, data);
  return res.data;
};

export const cancelMeeting = async (meetingId) => {
  const res = await axiosInstance.delete(`/meetings/cancel/${meetingId}`);
  return res.data;
};


// Export axiosInstance for reuse if needed
export default axiosInstance;
