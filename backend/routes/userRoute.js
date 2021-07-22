const express = require("express");
const userRoute = express.Router();
const User = require("../models/User");

//Register
userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User Exist");
    }

    const userCreated = await User.create({ name, email, password });
    res.json({
      name: userCreated.name,
      email: userCreated.email,
      password: userCreated.password,
    });
  } catch (error) {
    throw new Error("fucking error");
  }
});

//Login
userRoute.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && password === user.password) {
    res.status(200);
    res.json({
      name,
      email,
      password,
    });
  } else {
    res.status(500);
    res.send("funcking error");
  }
});

module.exports = userRoute;
