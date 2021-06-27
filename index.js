const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const db = require('./config/keys')
const cors = require('cors')
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const router = express.Router();
const path = require("path");
const ImageModel = require('./models/image')
const PORT =process.env.PORT || 8800

dotenv.config();

app.use(express.static(path.resolve('../server')));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './public/images')
  },

  filename: function (req, file, cb) {
      cb(null, file.originalname)
  }
}) 

var upload = multer({
  storage: storage,
})
app.post("/api/upload", upload.single('file'),async function (req, res, next) {
  
      const imageInfo = await new ImageModel({
          image: req.file.path
      })
      
      imageInfo.save()
      .then(result => {
          res.status(200).send(result)
      }).catch(err => {
          console.log(err);
      })
  
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

const io = require("socket.io")(server, {
  cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
    console.log(users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text, type }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        type
      });
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


if(process.env.NODE_ENV=='production'){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
  });
}

 
server.listen(PORT, () => {
  console.log("Backend server is running!");
});
 