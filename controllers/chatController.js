const chatsRepository = require('../repositories/chatRepository')

class ChatController {
    static async index(req, res, next) {
        const user_id = req.session.user.id;

        try {
            const chats = await chatsRepository.all(user_id)
            res.render('TODO', {chats: chats})
        } catch (err) {
            next(err)
        }
    }

    static async show(req, res, next) {
        const chat_id = req.body.id;

        try {
            const chat = await chatsRepository.get(chat_id)
            res.render('TODO', {chat: chat})
        } catch (err) {
            next(err)
        }
    }

    static async store(req, res, next) {
        const user1_id = req.session.user.id;
        const user2_id = req.body.user2_id;

        try {
            await chatsRepository.insert(user1_id, user2_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    static async add_message(req, res, next) {
        const messageDTO = {
            sender_id: req.session.user.id,
            recipient_id: req.body.recipient_id,
            chat_id: req.body.id,
            message: req.body.message
        }

        try {
            await chatsRepository.add_message(messageDTO)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }

    }
}

module.exports = ChatController