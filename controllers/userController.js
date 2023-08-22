class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    index(req, res) {
        res.render('loginChoice');
    }

    login(req, res) {
        res.render('login');
    }

    async authenticate(req, res, next) {
        try {
            const user = await this.userRepository.getByEmailPassword(req.body);

            if (user) {
                req.session.user = {
                    id: user.id, name: `${user.first_name} ${user.last_name}`,
                };
                res.redirect('/chats');
            } else {
                res.redirect('/user/login');
            }
        } catch (err) {
            next(err);
        }
    }

    shelterRegister(req, res) {
        res.render('shelterRegister');
    }

    async shelterStore(req, res, next) {
        try {
            await this.userRepository.insert(req.body);
            res.redirect('/auth/login');
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
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }

    edit(req, res) {
        res.render('editProfile');
    }

    async update(req, res, next) {
        try {
            await this.userRepository.update(req.body);
            res.redirect('/');
        } catch (err) {
            next(err);
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
