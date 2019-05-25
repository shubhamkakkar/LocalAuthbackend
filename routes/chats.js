const router = require("express").Router();
const mongoose = require("mongoose");

require("../models/Chat");
const Chat = mongoose.model("ChatModel");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Chat.find({ userId: id })
    .then(chat => {
      if (chat) {
        return res.status(200).json({ chat });
      } else {
        return res.status(200).json({ data: "no chat found" });
      }
    })
    .catch(chat => console.log(chat));
});

module.exports = router;
