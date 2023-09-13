const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')

const ChatController = require("../controllers/chatController");
const ChatsRepository = require("../repositories/chatRepository");

const chatsRepository = new ChatsRepository(db);
const chatController = new ChatController(chatsRepository);

router.get("/", requireLogin, chatController.index.bind(chatController));
router.post("/:id/message", requireLogin, chatController.add_message.bind(chatController));
router.post('/store', requireLogin, chatController.store.bind(chatController));

router.get("/:id/accept", requireLogin, chatController.accept_request.bind(chatController));
router.get("/:id/reject", requireLogin, chatController.reject_request.bind(chatController));

module.exports = router;
