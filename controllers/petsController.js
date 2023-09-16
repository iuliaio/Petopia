class PetsController {
    constructor(petsRepository) {
        this.petsRepository = petsRepository
    }

    async index(req, res, next) {
        const filters = {
            species: req.query.species,
            age: req.query.age,
            size: req.query.size,
            color: req.query.color,
            gender: req.query.gender,
            location: req.query.location
        }

        try {
            const pets = await this.petsRepository.all(filters)
            res.render('searchPage', {pets: pets})
        } catch (err) {
            next(err)
        }
    }

    async show(req, res, next) {
        const pet_id = req.params.id;
        const user_id = req.session.user.id
        try {
            const pet = await this.petsRepository.get(pet_id)
            const randomPets = await this.petsRepository.getRandom(pet_id)
            const addedToWishlist = await this.petsRepository.already_wished(user_id, pet_id)
            res.render('petProfile', {
                pet: pet, pets: randomPets, addedToWishlist: addedToWishlist
            })
        } catch (err) {
            next(err)
        }
    }

    async store(req, res, next) {
        let imgPath;
        if (req.file === undefined) {
            imgPath = "/public/img/profilepetpic.png";
        } else if (req.file.path === undefined || req.file.path === "") {
            imgPath = "/public/img/profilepetpic.png";
        } else {
            imgPath = "/" + req.file.path
        }

        const pet = {
            name: req.body.name,
            species: req.body.species,
            breed: '',
            age: req.body.age,
            gender: req.body.gender,
            size: req.body.size,
            color: req.body.color,
            weight: req.body.weight,
            description: req.body.description,
            vaccination_status: '',
            neutered: '',
            health_condition: '',
            personality_traits: '',
            available: 1,
            user_id: req.session.user.id,
            born_at: 'current_date',
            profile_photo: imgPath
        }

        try {
            await this.petsRepository.insert(pet)
            res.redirect('/pets')
        } catch (err) {
            next(err)
        }
    }

    async wish(req, res, next) {
        const user_id = req.session.user.id;
        const pet_id = req.params.id
        try {
            let already_wished = await this.petsRepository.already_wished(user_id, pet_id)
            if (already_wished !== undefined) {
                await this.petsRepository.un_wish_pet(user_id, pet_id)
            } else {
                await this.petsRepository.wish_pet(user_id, pet_id)
            }

            res.redirect('/pets/' + pet_id)
        } catch (err) {
            next(err)
        }
    }

    async request(req, res, next) {
        const user_id = req.session.user.id;
        const pet_id = req.params.id
        try {
            let already_requested = await this.petsRepository.already_requested(user_id, pet_id)
            if (already_requested === undefined) {
                await this.petsRepository.request_pet(user_id, pet_id)
            }

            res.redirect('/pets/' + pet_id)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PetsController;
