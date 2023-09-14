class PetsRepository {
    constructor(db) {
        this.db = db
    }

    all(filters) {
        const {species, age, size, color, gender, location} = filters

        // Start with a valid query
        let query = `SELECT pets.*, u.first_name || ' ' || u.last_name as user_name
                     FROM pets
                              inner join users u on pets.user_id = u.id
                     WHERE pets.available = 1 `
        let args = []

        if (species && species !== '') {
            query += 'AND pets.species = ?'
            args.push(species)
        }
        if (age && age !== '') {
            query += 'AND pets.age = ?'
            args.push(age)
        }
        if (size && size !== '') {
            query += 'AND pets.size = ?'
            args.push(size)
        }
        if (color && color !== '') {
            query += 'AND pets.color = ?'
            args.push(color)
        }
        if (gender && gender !== '') {
            query += 'AND pets.gender = ?'
            args.push(gender)
        }
        if (location && location !== '') {
            query += 'AND u.location = ?'
            args.push(location)
        }


        return new Promise((resolve, reject) => {
            this.db.all(query, args, function (err, rows) {
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
            this.db.get(`SELECT pets.*,
                                u.first_name || ' ' || u.last_name as user_name,
                                u.location
                         FROM pets
                                  inner join main.users u on u.id = pets.user_id
                         WHERE pets.id = ?`, [pet_id], function (err, row) {
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
            available,
            user_id,
            born_at,
            profile_photo
        } = pet

        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO pets(name, species, breed, age, gender, size, color, weight, description,
                                          vaccination_status, neutered, health_condition, personality_traits, available,
                                          user_id, born_at, profile_photo)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                                 ?)`, [name, species, breed, age, gender, size, color, weight, description, vaccination_status, neutered, health_condition, personality_traits, available, user_id, born_at, profile_photo], function (err) {
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
            personality_traits,
            available,
            born_at,
            profile_photo
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
                             personality_traits = ?,
                             available          = ?,
                             born_at            = ?,
                             profile_photo      = ?
                         WHERE id = ?`, [name, species, breed, age, gender, size, color, weight, description, vaccination_status, neutered, health_condition, personality_traits, available, born_at, profile_photo, id], function (err) {
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

    getWishlist(user_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`select pets.*,
                                u.first_name || ' ' || u.last_name as user_name
                         from Pets
                                  inner join main.users u on Pets.user_id = u.id
                                  inner join wish_list wl on wl.user_id = ? and wl.pet_id = Pets.id`, [user_id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })

    }

    contactedPets(user_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`select pets.*,
                                u.first_name || ' ' || u.last_name as user_name
                         from Pets
                                  inner join main.users u on Pets.user_id = u.id
                                  inner join requests r on r.adopter_id = ? and r.pet_id = pets.id`, [user_id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })

    }

    getDogs(user_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`select pets.*,
                                u.first_name || ' ' || u.last_name as user_name
                         from Pets
                                  inner join main.users u on u.id = Pets.user_id
                         where species like \'Dog\'
                           and user_id = ?`, [user_id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })

    }

    getCats(user_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`select pets.*,
                                u.first_name || ' ' || u.last_name as user_name
                         from Pets
                                  inner join main.users u on u.id = Pets.user_id
                         where species like \'Cat\'
                           and user_id = ?`, [user_id], function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    getRandom(pet_id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT pets.*,
                                u.first_name || ' ' || u.last_name as user_name
                         FROM pets
                                  inner join main.users u on u.id = pets.user_id
                         where pets.id <> ?
                         order by random()
                         limit 4`, [pet_id], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    already_wished(user_id, pet_id) {
        return new Promise((resolve, reject) => {
            this.db.get(`select 1
                         from wish_list
                         where user_id = ?
                           and pet_id = ?`, [user_id, pet_id], (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
    }

    wish_pet(user_id, pet_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`insert into wish_list (user_id, pet_id)
                         values (?, ?)`, [user_id, pet_id], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    un_wish_pet(user_id, pet_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`delete
                         from wish_list
                         where user_id = ?
                           and pet_id = ?`, [user_id, pet_id], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    already_requested(user_id, pet_id) {
        return new Promise((resolve, reject) => {
            this.db.get(`select 1
                         from requests
                         where adopter_id = ?
                           and pet_id = ?`, [user_id, pet_id], (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
    }

    request_pet(user_id, pet_id) {
        return new Promise((resolve, reject) => {
            this.db.run(`insert into requests (adopter_id, pet_id, owner_id, status)
                         select ?, ?, p.user_id, 'IN PROGRESS'
                         from pets p
                         where p.id = ? and p.available = 1`, [user_id, pet_id, pet_id], (err) => {
                if (err) {
                    reject(err)
                }
            })
            this.db.run(`insert into chats (adopter_id, pet_id, owner_id, created_at)
                         select ?, ?, p.user_id, current_date
                         from pets p
                         where p.id = ? and p.available = 1;`, [user_id, pet_id, pet_id], (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }
}

module.exports = PetsRepository;