const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  userMessage: {
    message: {
      type: Array,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
});

mongoose.model("ChatModel", ChatSchema);
