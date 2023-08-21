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
        const selectedIndex = req.query.id;

        try {
            const chats = await this.chatsRepository.all(user_id)
            let chat;
            if (selectedIndex !== undefined) chat = await this.chatsRepository.allMessages(chats[selectedIndex].id)

            res.render('chats', {chats: chats, chat: chat, selectedIndex: selectedIndex})
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
            chat_id: req.body.id,
            message: req.body.message
        }

        try {
            await this.chatsRepository.add_message(messageDTO)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ChatController;
