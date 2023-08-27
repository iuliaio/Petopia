class PetsController {
    constructor(petsRepository) {
        this.petsRepository = petsRepository
    }

    async index(req, res, next) {
        // TODO: Get filters and filter the search results
        // TODO: Get page number to implement pagination
        try {
            const pets = await this.petsRepository.all()
            res.render('TODO', {pets: pets})
        } catch (err) {
            next(err)
        }
    }

    async show(req, res, next) {
        const pet_id = req.params.id;
        try {
            const pet = await this.petsRepository.get(pet_id)
            res.render('TODO', {pet: pet})
        } catch (err) {
            next(err)
        }
    }

    create(req, res) {
        res.render('TODO')
    }

    async store(req, res, next) {
        const pet = req.body;
        try {
            await this.petsRepository.insert(pet)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async edit(req, res, next) {
        const pet_id = req.params.id;
        try {
            const pet = await this.petsRepository.get(pet_id)
            res.render('TODO', {pet: pet})
        } catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        const pet = req.body;
        try {
            await this.petsRepository.update(pet)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        const pet_id = req.params.id;
        try {
            await this.petsRepository.delete(pet_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PetsController;
