class ChatRepository {
    constructor(db) {
        this.db = db;
    }

    all(user_id) {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM chats where user1_id = ? or user2_id = ?', [user_id, user_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    allMessages(chat_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT *
                         FROM messages
                         where chat_id = ?`, [chat_id], (err, rows) => {
                if (err) {
                    reject(err)

                } else {
                    resolve(rows)
                }
            })
        })
    }


    get(chat_id) {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM messages where chat_id = ?', [chat_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    insert(user1_id, user2_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO chats (user1_id, user2_id)
                         values (?, ?)`, [user1_id, user2_id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.lastID)
                }
            })
        })
    }

    add_message(messageDTO) {
        const {chat_id, sender_id, recipient_id, message} = messageDTO;

        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO messages (chat_id, sender_id, recipient_id, message)
                         values (?, ?, ?, ?)`, [chat_id, sender_id, recipient_id, message], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.lastID)
                }
            })
        })
    }
}

module.exports = ChatRepository;
