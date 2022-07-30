import { useEffect, useState } from "react";
import "./Conversations.css";

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      const res = await fetch(`http://localhost:8080/api/users/${friendId}`);
      const data = await res.json();
      setUser({ ...data });
    };
    getUser();
  }, []);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user.avatar
            ? user.avatar
            : "https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
        }
      />
      <span className="convsersationName">{user.name}</span>
    </div>
  );
}
