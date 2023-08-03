const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/", chatController.index);

router.get("/:id", chatController.show);

router.get("/:id/message", chatController.message);

module.exports = router;
