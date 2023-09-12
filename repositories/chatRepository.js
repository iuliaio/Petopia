class ChatRepository {
    constructor(db) {
        this.db = db;
    }

    all(user_id) {
        return new Promise((resolve, reject) => {
            let query = `select c.id,
                                a.id                               as adopter_id,
                                a.first_name || ' ' || a.last_name as adopter_name,
                                a.profile_picture                  as adopter_picture,
                                o.id                               as owner_id,
                                o.first_name || ' ' || o.last_name as owner_name,
                                o.profile_picture                  as owner_picture,
                                p.name                             as pet_name
                         from chats c
                                  inner join users a on a.id = c.adopter_id
                                  inner join users o on o.id = c.owner_id
                                  inner join pets p on p.id = c.pet_id
                         where c.adopter_id = ?
                            or c.owner_id = ?`

            this.db.all(query, [user_id, user_id], (err, rows) => {
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

    insert(user1_id, user2_id, pet_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO chats (adopter_id, pet_id, owner_id)
                         values (?, ?, ?)`, [user1_id, pet_id, user2_id], function (err) {
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

    delete(chat_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`delete
                         from requests
                         where adopter_id = (select chats.adopter_id from chats where chats.id = ?)
                           and pet_id = (select chats.pet_id from chats where chats.id = ?)`, [chat_id, chat_id], function (err) {
                if (err) {
                    reject(err)
                }
            })
            this.db.run(`delete
                         from chats
                         where id = ?`, [chat_id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    accept_request(chat_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`insert into adoptions (user_id, pet_id)
                         select chats.adopter_id, chats.pet_id
                         from chats
                         where chats.id = ?`, [chat_id], function (err) {
                if (err) {
                    reject(err)
                }
            })
            this.db.run(`update pets
                         set available = 0
                         where id = (select pet_id from chats where chats.id = ?)`, [chat_id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}

module.exports = ChatRepository;
