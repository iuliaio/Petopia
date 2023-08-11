class UserRepository {
    constructor(db) {
        this.db = db;
    }

    all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getByEmailPassword(user) {
        const {email, password} = user;

        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    insert(user) {
        const {
            first_name,
            last_name,
            phone,
            email,
            password,
            profile_picture,
            charity_name,
            charity_id,
            description,
            country,
            county,
            zip_code,
            address,
            created_at
        } = user;

        return new Promise((resolve, reject) => {
            this.db.run('INSERT INTO users (first_name, last_name, phone, email, password, profile_picture, charity_name, charity_id, description, country, county, zip_code, address, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [first_name, last_name, phone, email, password, profile_picture, charity_name, charity_id, description, country, county, zip_code, address, created_at], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    update(user) {
        const {
            id,
            first_name,
            last_name,
            phone,
            email,
            password,
            profile_picture,
            charity_name,
            charity_id,
            description,
            country,
            county,
            zip_code,
            address
        } = user;

        return new Promise((resolve, reject) => {
            this.db.run('UPDATE users SET first_name = ?, last_name = ?, phone = ?, email = ?, password = ?, profile_picture = ?, charity_name = ?, charity_id = ?, description = ?, country = ?, county = ?, zip_code = ?, address = ? WHERE id = ?', [first_name, last_name, phone, email, password, profile_picture, charity_name, charity_id, description, country, county, zip_code, address, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM users WHERE id = ?', id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = UserRepository;
