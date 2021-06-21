const express = require("express");
const app = express();
const mongoose = require("mongoose");
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
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
// app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.resolve('../api')));

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
 
app.listen(8800, () => {
  console.log("Backend server is running!");
});
 