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
const mime = require("mime-types");
const {v4: uuid} = require("uuid");
const fs = require("fs-extra");
const cors = require("cors");

dotenv.config();

dbConnect();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `./images/temp/${req.params.userId}`;
        // 만약 상위 폴더까지 생성하고 싶으면 두 번째 인자로 recursive:true 옵션
        !fs.existsSync(path) && fs.mkdirSync(path, (err) => {
            if(err) cb(err);
        });
        cb(null, `images/temp/${req.params.userId}`);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (["image/jpeg", "image/jpg", "image/png"].includes(file.mimetype)) 
            cb(null, true);
        else 
            cb(new Error("해당 파일의 형식을 지원하지 않습니다."), false);
        }
    ,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

app.post("/api/upload/:userId", upload.single("file"), (req, res) => {
    res
        .status(200)
        .json(req.file);
});

app.delete("/api/upload/:userId", (req, res) => {
    const path = `./images/temp/${req.params.userId}`;
    try {
        fs.existsSync(path) && fs.removeSync(path);
        res.status(200).json("디렉토리를 성공적으로 삭제하였습니다.")
    } catch (err) {
        throw new Error(err.message);
    }
})

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.listen(5000, () => {
    console.log("server is running");
});
