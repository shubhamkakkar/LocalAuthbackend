const router = require("express").Router();
const mongoose = require("mongoose");

require("../models/User");
const User = mongoose.model("UserModel");
router.get("/", (req, res) => {
  User.find()
    .then(user => {
      if (user) {
        return res.status(200).json({ data: user });
      } else {
        return res.status(200).json({ data: "No user found" });
      }
    })
    .catch(er => console.log(er));
});

module.exports = router;
