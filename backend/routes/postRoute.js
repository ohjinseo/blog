const router = require("express").Router();
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const fs = require("fs-extra");

//REGISTER POST
router.post("/register", async (req, res) => {
  try {
    let newPost = await new Post(req.body).save();
    const {_id:postId, userId, desc} = newPost;

    const oldPath = `./images/temp/${userId}`;
    const newPath = `./images/posts/${postId}`;

    // 삭제를 대비해 폴더 생성
    !fs.existsSync(newPath) && fs.mkdirSync(newPath);

    const imgSrcReg = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

    while(imgSrcReg.test(desc)){
      let src = RegExp.$2.trim();
      let imgName = src.substr(src.indexOf(userId) + userId.length + 1);
      let tmpImgPath = oldPath + `/${imgName}`;
      let postImgPath = newPath + `/${imgName}`;
      
      // 만약 temp 폴더에 desc 이미지가 존재하면
      fs.existsSync(tmpImgPath) && fs.rename(tmpImgPath, postImgPath, (err) => {
        if(err) throw new Error(err);
        console.log("성공적으로 이미지 옮김");
      })
    }

    const newDesc = desc.replaceAll(`temp/${userId}`, `posts/${postId}`);
    newPost = await Post.findOneAndUpdate({_id:postId}, {desc:newDesc});

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//UPDATE POST
router.put("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated successfully");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE POST
router.delete(
  "/:postId",
  asyncHandler(async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("Post deleted successfully");
      } else {
        res.status(403).json("You can delete only your post");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  })
);

//FETCH ALL POST || MY POST || ONLY POST
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const postId = req.query.postId;
  if (postId) {
    try {
      const post = await Post.findById(postId);
      !post && res.status(404).json("Not found");
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    try {
      const posts = userId ? await Post.find({ userId }) : await Post.find({});
      !posts && res.status(404).json("Not found");
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
});

//GET CATEGORY
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  !category && res.status(404).json("no category");
  try {
    const categoryPosts = await Post.find({ category });
    res.status(200).json(categoryPosts);
  } catch (error) {
    res.status(200).json(error);
  }
});

//LIKE || DISLIKE POST
router.put("/like/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (post.likes.includes(req.body.userId)) {
      //만약 좋아요를 한유저라면
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("dislike");
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("like");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
