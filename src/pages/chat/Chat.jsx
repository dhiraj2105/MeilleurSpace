import React, { useEffect, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/conversation/Conversation";
import { Link } from "react-router-dom";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";

function Chat() {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  return (
    <div className="Chat">
      {/* left side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div>
                <Conversation data={chat} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <Link to="../home">
            <img src={Home} alt="" />
          </Link>
          <UilSetting />
          <img src={Noti} />
          <Link to="../chat">
            <img src={Comment} alt="" />
          </Link>
          {/* chat body */}
        </div>
      </div>
    </div>
  );
}

export default Chat;
