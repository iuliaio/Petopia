const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/", chatController.index);

router.get("/:id", chatController.show);

router.post("/:id/message", chatController.add_message);

router.post('/store', chatController.store)

module.exports = router;
