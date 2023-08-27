class ChatController {
    constructor(chatsRepository) {
        this.chatsRepository = chatsRepository;
    }

    async index(req, res, next) {
        if (req.session.user === undefined) {
            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/' : referer);
            return;
        }

        const user_id = req.session.user.id;
        const selectedChat = req.query.id;

        try {
            const chats = await this.chatsRepository.all(user_id)
            let chat;
            let recipient_id;
            if (selectedChat !== undefined) {
                chat = await this.chatsRepository.allMessages(selectedChat)

                for (let i = 0; i < chats.length; i++) {
                    if (chats[i].id == selectedChat)
                    {
                        if (chats[i].user1_id === req.session.user.id) {
                            recipient_id = chats[i].user1_id
                        } else {
                            recipient_id = chats[i].user2_id
                        }
                    }
                }
            }

            res.render('chats', {chats: chats, chat: chat, selectedChat: selectedChat, recipient_id: recipient_id})
        } catch (err) {
            next(err)
        }
    }

    async store(req, res, next) {
        const user1_id = req.session.user.id;
        const user2_id = req.body.user2_id;

        try {
            await this.chatsRepository.insert(user1_id, user2_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async add_message(req, res, next) {
        const messageDTO = {
            sender_id: req.session.user.id,
            recipient_id: req.body.recipient_id,
            chat_id: req.body.chat_id,
            message: req.body.message
        }

        if (messageDTO.message === "")
            return;

        try {
            await this.chatsRepository.add_message(messageDTO)
            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/chats' : referer);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ChatController;
