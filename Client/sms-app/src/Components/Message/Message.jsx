import "./Message.css";
import { format } from "timeago.js";
export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://st.depositphotos.com/1779253/5140/v/450/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"
          alt=""
        />
        <p className="messageText">{message.text} </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
