const express = require("express");
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/userRoute");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

dbConnect();

app.use(express.json());

app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    message: err.message,
  });
});

app.listen(5000, () => {
  console.log("server is running");
});
