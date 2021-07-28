const express = require("express");
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");

dotenv.config();

dbConnect();

app.use(express.json());
app.use(helmet());

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.listen(5000, () => {
  console.log("server is running");
});
