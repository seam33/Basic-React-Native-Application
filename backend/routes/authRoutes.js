const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const user = mongoose.model("user");

// Method Post
router.post("/signup", (req, res) => {
  console.log("POST", req.body);

  const { email, password } = req.body;
  const newUser = new user({ email, password });

  newUser.save((err,response) => {
    if (err){ 
        console.log(err.message)
        res.status(422).send(err.message);
    } else{
        console.log(response)
        res.send("Document was added successfully.") 
    } 
  })
});

module.exports = router;
