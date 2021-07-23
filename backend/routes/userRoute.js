const express = require("express");
const asyncHandler = require("express-async-handler"); //비동기 에러처리하는데 유용
const userRoute = express.Router();
const User = require("../models/User");

//Register
userRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
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
      throw new Error(error);
    }
  })
);

//Login
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && password === user.password) {
      res.status(200);
      res.json({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    } else {
      throw new Error("Not fund user");
    }
  })
);

module.exports = userRoute;
