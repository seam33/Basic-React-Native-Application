const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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
        const token = jwt.sign({userId: response._id},process.env.jwt_key)
        res.send({token});
    } 
  })
});

module.exports = router;
