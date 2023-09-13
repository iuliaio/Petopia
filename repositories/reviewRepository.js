class ReviewRepository {
    constructor(db) {
        this.db = db;
    }

    all(user_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT u.first_name || '  ' || u.last_name as user_name,
                                u.profile_picture                   as user_profile_picture,
                                f.comment
                         FROM feedback f
                                  inner join users u on u.id = f.sender_id
                                  inner join users s on s.id = f.receiver_id
                         where receiver_id = ?`, [user_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    add_review(review) {
        const {receiver_id, sender_id, rating, comment} = review;

        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO feedback (receiver_id, sender_id, rating, comment)
                         values (?, ?, ?, ?)`, [receiver_id, sender_id, rating, comment], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.lastID)
                }
            })
        })
    }

    review_exists(sender_id, receiver_id) {
        return new Promise((resolve, reject) => {
            this.db.get(`select 1
                         from feedback
                         where sender_id = ?
                           and receiver_id = ?`, [sender_id, receiver_id], function (err, row) {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })

    }

}

module.exports = ReviewRepository;
