const userRepository = require('../repositories/UserRepository');

class UserController {
    static index(req, res) {
        res.render('loginChoice');
    }

    static login(req, res) {
        res.render('login');
    }

    static async authenticate(req, res, next) {
        try {
            const user = await userRepository.getByEmailPassword(req.body);

            if (user) {
                req.session.user = {
                    id: user.id, name: `${user.first_name} ${user.last_name}`,
                };
                res.redirect('/pets');
            } else {
                res.redirect('/auth/login');
            }
        } catch (err) {
            next(err);
        }
    }

    static shelterRegister(req, res) {
        res.render('shelterRegister');
    }

    static async shelterStore(req, res, next) {
        try {
            await userRepository.insert(req.body);
            res.redirect('/auth/login');
        } catch (err) {
            next(err);
        }
    }

    static adopterRegister(req, res) {
        res.render('adopterRegister');
    }

    static async adopterStore(req, res, next) {
        try {
            await userRepository.insert(req.body);
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }

    static edit(req, res) {
        res.render('editProfile');
    }

    static async update(req, res, next) {
        try {
            await userRepository.update(req.body);
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }

    static logout(req, res, next) {
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
