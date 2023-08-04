const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");

router.get("/", forumController.index);

router.get("/:id", forumController.show);

router.get("/create", forumController.create);

router.post("/store", forumController.store);

router.get("/:id/edit", forumController.edit);

router.post("/:id/update", forumController.update);

router.post("/:id/delete", forumController.destroy);

router.post("/:id/like", forumController.like);

router.post("/:id/dislike", forumController.dislike);

router.post("/:id/comment", forumController.add_comment);

module.exports = router;
