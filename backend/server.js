const express = require("express");
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");

dotenv.config();

dbConnect();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(express.json());
app.use(helmet());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.listen(5000, () => {
  console.log("server is running");
});
