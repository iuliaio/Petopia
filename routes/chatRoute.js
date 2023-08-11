const express = require("express");
const router = express.Router();

const ChatController = require("../controllers/chatController");
const ChatsRepository = require("../repositories/chatRepository");

const chatsRepository = new ChatsRepository(db);
const chatController = new ChatController(chatsRepository);

router.get("/", chatController.index.bind(chatController));

router.get("/:id", chatController.show.bind(chatController));

router.post("/:id/message", chatController.add_message.bind(chatController));

router.post('/store', chatController.store.bind(chatController));

module.exports = router;
