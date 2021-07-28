const router = require("express").Router();
const Comment = require("../models/Comment");

//댓글 달기
router.post("/", async (req, res) => {
  try {
    const newComment = await new Comment(req.body).save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//포스터 ID 또는 사용자 ID 로 댓글 가져오기
router.get("/", async (req, res) => {
  const postId = req.query.postId;
  const userId = req.query.userId;
  try {
    const comments = postId
      ? await Comment.find({ postId })
      : await Comment.find({ userId });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

//댓글 수정
router.put("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId === req.body.userId) {
      try {
        await comment.updateOne({ $set: req.body });
        res.status(200).json("comment update successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You can only delete your comment");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//댓글 삭제
router.delete("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId === req.body.userId) {
      try {
        comment.deleteOne();
        res.status(200).json("comment delete successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You can only delete comment only your comment");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
