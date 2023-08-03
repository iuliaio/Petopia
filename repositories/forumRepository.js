class ForumRepository {
    static all() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT posts.title,
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

    static get(post_id) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT posts.title,
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

    static insert(post) {
        const {title, content, user_id} = post;

        return new Promise((resolve, reject) => {
            db.run('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, user_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            })
        })
    }

    static update(post) {
        const {id, title, content, user_id} = post;

        return new Promise((resolve, reject) => {
            db.run('UPDATE posts SET title = ?, content = ?, user_id = ? WHERE id = ?', [title, content, user_id, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    static delete(post_id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM posts WHERE id = ?', [post_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })

    }
}

module.exports = ForumRepository