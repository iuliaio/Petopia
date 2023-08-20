const CommentRepository = require('../repositories/commentRepository')

class ForumRepository {
    constructor(db) {
        this.db = db;
    }

    all() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT posts.title,
                                posts.content,
                                users.first_name || ' ' || users.last_name AS author_name
                         FROM posts
                                  LEFT JOIN users ON posts.user_id = users.id = users.id
                         WHERE posts.created_at IS NOT NULL
                         ORDER BY posts.created_at DESC`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    get(post_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT posts.title,
                                posts.content,
                                users.first_name || ' ' || users.last_name AS author_name
                         FROM posts
                                  LEFT JOIN users ON posts.user_id = users.id = users.id
                         WHERE posts.id = ?`, [post_id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    insert(post) {
        const {title, content, user_id} = post;

        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, user_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            })
        })
    }

    update(post) {
        const {id, title, content, user_id} = post;

        return new Promise((resolve, reject) => {
            this.db.run('UPDATE posts SET title = ?, content = ?, user_id = ? WHERE id = ?', [title, content, user_id, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            })
        })
    }

    async delete(post_id) {
        const commentRepository = new CommentRepository(this.db)
        await commentRepository.deleteAllByPost(post_id)

        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM posts WHERE id = ?', [post_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            })
        })
    }

    add_like(post_id) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE posts SET likes = likes + 1 WHERE id = ?', [post_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            })
        })
    }

    add_dislike(post_id) {
        return new Promise((resolve, reject) => {
            this.db.run('UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?', [post_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            })
        })
    }
}

module.exports = ForumRepository;