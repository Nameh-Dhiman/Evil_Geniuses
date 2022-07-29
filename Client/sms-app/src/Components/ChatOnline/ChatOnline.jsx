import { useEffect, useState } from "react";
import "./ChatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [Users, setUsers] = useState([]);
  const [offlineUsers, setOfflineUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      let res = await fetch("http://localhost:8080/api/users/instructors");
      let data = await res.json();
      console.log(data);
      let curr = onlineUsers.filter((user) => user.userId !== currentId);

      let currOnline = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < curr.length; j++) {
          if (data[i]._id == curr[j].userId) {
            currOnline.push(data[i]);
          }
        }
      }
      data = data.filter((u) => !currOnline.includes(u));
      data = data.filter((u) => u._id != currentId);

      setUsers([...currOnline]);
      setOfflineUsers([...data]);
    };
    getAllUsers();
  }, [onlineUsers]);
  const handelClick = async (user) => {
    try {
      let res = await fetch(
        `http://localhost:8080/conversation/find/${currentId}/${user._id}`
      );
      let data = await res.json();
      setCurrentChat(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatOnline">
      {Users.map((c) => {
        return (
          <div
            key={c._id}
            className="chatOnlineFriend"
            onClick={() => {
              handelClick(c);
            }}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src="https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{c.name}</span>
          </div>
        );
      })}
      {offlineUsers.map((c) => {
        return (
          <div
            key={c._id}
            className="chatOnlineFriend"
            onClick={() => {
              handelClick(c);
            }}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src="https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
                alt=""
              />
              {/* <div className="chatOnlineBadge"></div> */}
            </div>
            <span className="chatOnlineName">{c.name}</span>
          </div>
        );
      })}
    </div>
  );
}
