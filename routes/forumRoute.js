const express = require("express");
const router = express.Router();

const ForumRepository = require('../repositories/forumRepository')
const CommentRepository = require('../repositories/commentRepository')
const ForumController = require("../controllers/forumController");

const forumRepository = new ForumRepository(db)
const commentRepository = new CommentRepository(db)
const forumController = new ForumController(forumRepository, commentRepository)

router.get("/", forumController.index.bind(forumController));

router.get("/:id", forumController.show.bind(forumController));

router.get("/create", forumController.create.bind(forumController));

router.post("/store", forumController.store.bind(forumController));

router.get("/:id/edit", forumController.edit.bind(forumController));

router.post("/:id/update", forumController.update.bind(forumController));

router.post("/:id/delete", forumController.destroy.bind(forumController));

router.post("/:id/like", forumController.like.bind(forumController));

router.post("/:id/dislike", forumController.dislike.bind(forumController));

router.post("/:id/comment", forumController.add_comment.bind(forumController));

module.exports = router;
