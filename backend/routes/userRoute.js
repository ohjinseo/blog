const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    const newUser = await new User(req.body).save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(500).json("Not found user");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validPassword && res.status(500).json("Wrong password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//USER UPDATE
router.put("/:userId", async (req, res) => {
  try {
    if (req.params.userId === req.body.userId) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          req.body.password = hashedPassword;
        } catch (error) {
          res.status(500).json(error);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
          $set: req.body,
        });
      } catch (error) {
        res.status(500).json(error);
      }
      res.status(200).json("User has been updated");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//USER DELETE
router.delete("/:userId", async (req, res) => {
  if (req.params.userId === req.body.userId) {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
