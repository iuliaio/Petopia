const userRepository = require('../repositories/userRepository')

class AuthenticationController {

    static index(req, res) {
        res.render("TODO")
    }

    static login(req, res) {
        res.render("TODO")
    }

    static authenticate(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static shelterRegister(req, res) {
        res.render("TODO")
    }

    static shelterStore(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static adopterRegister(req, res) {
        res.render("TODO")
    }

    static adopterStore(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static edit(req, res) {
        res.render("TODO")
    }

    static update(req, res, next) {
        try {

        } catch (err) {
            next(err)
        }
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {

            } else {
                res.redirect("TODO");
            }
        });
    }
}


module.exports = AuthenticationController