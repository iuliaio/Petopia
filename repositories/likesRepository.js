class LikesRepository {
    static insert(user_id, post_id, comment_id) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO likes (post_id, comment_id, user_id) VALUES (?, ?, ?)', [post_id, comment_id, user_id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            })
        })
    }
}

module.exports = LikesRepository