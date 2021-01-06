const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const user = mongoose.model("user");

module.exports = (req, res, next) => {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.jwt_key, async (error, payload) => {
      
    if (error) {
      return res.status(401).send({ error: "You must be logged in" });
    }

    const { userId } = payload;
    const find_user = await user.findById(userId);
    req.user = find_user;
    next();
  });
};
