import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from "react";
import "./conversation.css";

function ConversationScreen({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
    
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      {/* <img
        className="conversationImg"
        src={
          conUserList?.data?.profilePicture
            ? PF + conUserList?.data?.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      /> */}
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default ConversationScreen
