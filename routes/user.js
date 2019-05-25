const router = require("express").Router();
const mongoose = require("mongoose");

require("../models/User");
const User = mongoose.model("UserModel");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then(user => {
      if (user) {
        res.status(200).json({ data: user });
      } else {
        return res.status(400).json({ data: "No user found" });
      }
    })
    .catch(er => {
      console.log(er);
      return res.status(200).json({ error: "request failed" });
    });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (name.length && email.length) {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          const newUser = new User({
            name,
            email
          });
          newUser
            .save()
            .then(saveSuccess => {
              return res.status(200).json({ user: newUser });
            })
            .catch(er => er);
        } else {
          return res.status(200).json({ message: "User exist", user });
        }
      })
      .catch(er => {
        console.log(er);
        return res.status(200).json({ error: `request failed try again` });
      });
  } else {
    return res.status(200).json({ error: "Fill in all the fields" });
  }
});

module.exports = router;
