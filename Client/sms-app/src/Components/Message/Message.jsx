import "./Message.css";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
export default function Message({ conversation, currentUser, message, own }) {
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
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            user._id === message.sender
              ? user.avatar
              : "https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
          }
          alt=""
        />
        <p className="messageText">{message.text} </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
