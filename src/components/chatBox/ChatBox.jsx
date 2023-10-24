import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { getUser } from "../../api/UserRequest";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      // console.log("Data receive in child chatbox : ", receivedMessage);
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getuserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getuserData();
  }, [chat, currentUser]);

  //fetching messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        // console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const messaage = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    //send message to db
    try {
      const { data } = await addMessage(messaage);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    //send message to socket server
    const receiveId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...messaage, receiveId });
  };

  // scroll to last msg
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt=""
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>

            {/* chatbox messages */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">Tap on a chat</span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
