import { useState, useEffect, useRef } from "react";
import ChatOnline from "../ChatOnline/ChatOnline";
import Conversations from "../Conversations/Conversations";
import Message from "../Message/Message";
import "./Messenger.css";
import { io } from "socket.io-client";
export default function Messenger() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers([...users]);
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    const getConversations = async () => {
      const res = await fetch(`http://localhost:8080/conversation/${user._id}`);
      const data = await res.json();
      console.log(data);
      setConversations([...data]);
    };
    getConversations();
  }, [user._id]);
  useEffect(() => {
    const getMessage = async () => {
      const res = await fetch(
        `http://localhost:8080/messages/${currentChat._id}`
      );
      const data = await res.json();
      setMessages([...data]);
    };
    getMessage();
  }, [currentChat]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = fetch("http://localhost:8080/messages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(message),
      });
      setMessages([...messages, message]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatWrapper">
          <input placeholder="Search for person" className="chatMenuInput" />
          {conversations.map((c) => {
            return (
              <div onClick={() => setCurrentChat({ ...c })}>
                <Conversations
                  key={c._id}
                  conversation={c}
                  currentUser={user}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat._id ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => {
                  return (
                    <div ref={scrollRef}>
                      <Message
                        key={m._id}
                        message={m}
                        own={m.sender === user._id}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="Enter Message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <button className="chatSubmitButton" onClick={handelSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">No Conversation Selected</span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  );
}
