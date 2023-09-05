class UserController {
    constructor(userRepository, petsRepository, chatRepository) {
        this.userRepository = userRepository
        this.petsRepository = petsRepository
        this.chatRepository = chatRepository
    }

    login(req, res) {
        res.render('login');
    }

    async authenticate(req, res, next) {
        try {
            const user = await this.userRepository.getByEmailPassword(req.body);

            if (user) {
                req.session.user = {
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    charity_id: user.charity_id,
                    charity_name: user.charity_name
                };
                res.redirect('/pets');
            } else {
                res.redirect('/user/login');
            }
        } catch (err) {
            next(err);
        }
    }

    shelterRegister(req, res) {
        res.render('registerShelter');
    }

    async shelterStore(req, res, next) {
        try {
            await this.userRepository.insert(req.body);
            res.redirect('/user/login');
        } catch (err) {
            next(err);
        }
    }

    adopterRegister(req, res) {
        res.render('adopterRegister');
    }

    async adopterStore(req, res, next) {
        try {
            await this.userRepository.insert(req.body);
            res.redirect('/user/login');
        } catch (err) {
            next(err);
        }
    }

    async myAccount(req, res) {
        if (req.session.user === undefined) {
            res.redirect('/');
            return;
        }

        const user_id = req.session.user.id;

        let messages = await this.chatRepository.all(user_id)
        for (let i = 0; i < messages.length; i++) {
            let userName = messages[i].adopter_id === user_id ? messages[i].owner_name : messages[i].adopter_name
            messages[i].name = userName + " - " + messages[i].pet_name;
        }

        const user_details = await this.userRepository.getById(user_id)
        if (req.session.user.charity_id === "" || req.session.user.charity_id === undefined || req.session.user.charity_id === null) {
            let wishlist = await this.petsRepository.getWishlist(user_id)
            let contactedPets = await this.petsRepository.contactedPets(user_id)

            res.render('adopterProfile', {
                details: user_details, messages: messages, wishlist: wishlist, contactedPets: contactedPets
            })
        } else {
            let dogs = await this.petsRepository.getDogs(user_id)
            let cats = await this.petsRepository.getCats(user_id)

            res.render('shelterProfile', {details: user_details, messages: messages, dogs: dogs, cats: cats})
        }
    }

    logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                next(err)
            } else {
                res.redirect('/');
            }
        });
    }
}

module.exports = UserController;
