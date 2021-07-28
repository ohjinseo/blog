const router = require("express").Router();
const Post = require("../models/Post");

//REGISTER POST
router.post("/register", async (req, res) => {
  try {
    const newPost = await new Post(req.body).save();
    res.status(200).json(newPost);
  } catch (error) {
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
router.delete("/:postId", async (req, res) => {
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
});

//FETCH ALL POST || MY POST
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  try {
    const posts = userId ? await Post.find({ userId }) : await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CATEGORY POST
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  !category && res.status(500).json("no category");
  try {
    const categoryPosts = await Post.find({ category });
    res.status(200).json(categoryPosts);
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = router;
