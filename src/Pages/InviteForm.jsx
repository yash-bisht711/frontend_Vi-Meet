import { useState } from "react";
import axios from "axios";

function InviteForm() {
  const [email, setEmail] = useState("");

  const sendInvite = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/meetings/invite",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`✅ Invite sent! Meeting link: ${res.data.meetingLink}`);
    } catch (err) {
      alert("❌ Error sending invite");
    } finally {
      setEmail("")
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter invitee email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendInvite}>Send Invite</button>
    </div>
  );
}

export default InviteForm;
