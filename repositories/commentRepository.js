class CommentRepository {

    static delete(comment_id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM comments WHERE id = ?', comment_id, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static deleteAllByPost(post_id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM comments WHERE post_id = ?', post_id, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static update(comment) {
        const {comment_id, content} = comment
        return new Promise((resolve, reject) => {
            db.run('UPDATE comments SET content = ? where id = ?', [content, comment_id], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static add_like(comment_id) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE comments SET likes = likes + 1 WHERE id = ?', [comment_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    static add_dislike(comment_id) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE comments SET dislikes = dislikes + 1 WHERE id = ?', [comment_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    static allByPost(post_id) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT comments.content,
                           comments.likes,
                           comments.dislikes,
                           u.first_name || ' ' || u.last_name user_name
                    FROM comments
                             inner join users u on comments.user_id = u.id
                    WHERE post_id = ?`, [post_id], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    static insert(comment) {
        const {post_id, user_id, content} = comment;
        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO comments (post_id, user_id, content, likes, dislikes)
                    values (?, ?, ?, ?, ?)`, [post_id, user_id, content, 0, 0], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static insertUserFeed
}

module.exports = CommentRepository