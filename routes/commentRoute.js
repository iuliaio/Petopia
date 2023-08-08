const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/:id/delete", commentController.delete);

router.post("/:id/update", commentController.update);

router.post("/:id/like", commentController.like);

router.post("/:id/dislike", commentController.dislike);

module.exports = router;