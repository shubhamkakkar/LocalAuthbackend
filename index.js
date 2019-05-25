const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3001;

const mongoUri = require("./credential");

mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(res => res)
  .catch(er => console.log(er));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./models/Chat");
const Chat = mongoose.model("ChatModel");

io.on("connection", socket => {
  console.log("a user connected :D");
  socket.on("chat message", chat => {
    const newMessage = new Chat(chat);
    newMessage
      .save()
      .then(saveSuccess => console.log(saveSuccess))
      .catch(er => console.log(er));
    const msgObj = {
      msg: chat.userMessage.message,
      id: chat.userId
    };
    io.emit("chat message", msgObj);
  });
});

const allUser = require("./routes/allUser");
const user = require("./routes/user");
const chats = require("./routes/chats");

app.use("/users", allUser);
app.use("/user", user);
app.use("/chats", chats);
server.listen(port, () => console.log("server running on port:" + port));
