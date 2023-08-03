const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");

router.get("/", forumController.index);

router.get("/:id", forumController.show);

router.get("/create", forumController.create);

router.get("/create", forumController.store);

router.get("/:id/edit", forumController.edit);

router.get("/:id/update", forumController.update);

router.get("/:id/delete", forumController.destroy);

router.get("/:id/like", forumController.like);

router.get("/:id/dislike", forumController.dislike);

router.get("/:id/comment", forumController.comment);

module.exports = router;
