class PetsRepository {
    constructor(db) {
        this.db = db
    }

    all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM pets', [], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    get(pet_id) {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT * FROM pets WHERE id = ?', [pet_id], function (err, row) {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
    }

    insert(pet) {
        const {
            name,
            species,
            breed,
            age,
            gender,
            size,
            color,
            weight,
            description,
            vaccination_status,
            neutered,
            health_condition,
            personality_traits,
            user_id
        } = pet
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO pets(name, species, breed, age, gender, size, color, weight, description,
                                          vaccination_status, neutered, health_condition, personality_traits, available,
                                          user_id)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [name, species, breed, age, gender, size, color, weight, description, vaccination_status, neutered, health_condition, personality_traits, 1, user_id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.lastID)
                }
            })
        })
    }

    update(pet) {
        const {
            id,
            name,
            species,
            breed,
            age,
            gender,
            size,
            color,
            weight,
            description,
            vaccination_status,
            neutered,
            health_condition,
            personality_traits
        } = pet
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE pets
                         SET name               = ?,
                             species            = ?,
                             breed              = ?,
                             age                = ?,
                             gender             = ?,
                             size               = ?,
                             color              = ?,
                             weight             = ?,
                             description        = ?,
                             vaccination_status = ?,
                             neutered           = ?,
                             health_condition   = ?,
                             personality_traits = ?
                         WHERE id = ?`, [name, species, breed, age, gender, size, color, weight, description, vaccination_status, neutered, health_condition, personality_traits, id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.lastID)
                }
            })
        })
    }

    delete(pet_id) {
        return new Promise((resolve, reject) => {
            this.db.run('DELETE FROM pets WHERE id = ?', [pet_id], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.lastID)
                }
            })
        })
    }
}

module.exports = PetsRepository;