const express = require("express");
const router = express.Router();

const CommentRepository = require('../repositories/commentRepository')
const CommentController = require("../controllers/commentController");

const commentRepository = new CommentRepository(db)
const commentController = new CommentController(commentRepository)

router.post("/:id/delete", commentController.delete.bind(commentController));

router.post("/:id/update", commentController.update.bind(commentController));

router.post("/:id/like", commentController.like.bind(commentController));

router.post("/:id/dislike", commentController.dislike.bind(commentController));

module.exports = router;