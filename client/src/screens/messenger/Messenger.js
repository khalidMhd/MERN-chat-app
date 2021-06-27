import "./messenger.css";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Navbar from '../Navbar';


export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const [picture, setPicture] = useState("")
  const [type, setType] = useState("text")


  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  console.log(userInfo);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("data", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        type: data.type,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userInfo?.data?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        userInfo?.data?.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [userInfo?.data]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/conversations/" + userInfo?.data?._id);
        setConversations(res.data, userInfo?.data?._id);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userInfo?.data?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userInfo?.data?._id,
      text: newMessage,
      type: type,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userInfo.data._id
    );

    socket.current.emit("sendMessage", {
      senderId: userInfo?.data?._id,
      receiverId: receiverId,
      text: newMessage,
      type: type,

    });

    try {
      const res = await axios.post("http://localhost:8800/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  let photo = new FormData();
  photo.append('file', picture);

  if (picture) {
    uploadFile(photo)//dispatch(UploadMedia(photo))
    setPicture("")
  }

  function uploadFile(file) {
    axios.post("http://localhost:8800/api/upload", file)
      .then(res => {
        setNewMessage(res.data.image)
        setType("file")
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <Navbar />
      <div className="messenger d-flex justify-content-start">

        <div className="d-none d-sm-block col-sm-3">
          <div>
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userInfo?.data} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-sm bg-light">
          <div className="d-flex flex-column h-100">
            {currentChat ? (
              <>
                <div className=" overflow-auto">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === userInfo?.data?._id} />
                    </div>
                  ))}
                </div>
                <div>
                  <textarea
                    className="w-100"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <input type="file" onChange={(e) => setPicture(e.target.files[0])} />
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="d-none d-sm-block h3 text-info">
                  Open a conversation to start a chat.
                </span>
                <div className="d-sm-block d-lg-none d-md-none">
                  {conversations.map((c) => (
                    <div onClick={() => setCurrentChat(c)}>
                      <Conversation conversation={c} currentUser={userInfo?.data} />
                    </div>
                  ))}
                </div>
              </>

            )}
          </div>
        </div>

        <div className="online_user col-sm-3">
          <div>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={userInfo?.data?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>

      </div>
    </>
  );
}
