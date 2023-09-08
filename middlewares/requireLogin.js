const requireLogin = (req, res, next) => {
    // Check if there is a valid user session with an 'id'
    if (req.session.user && req.session.user.id) {
        // User is logged in, continue to the next middleware or route handler
        next();
    } else {
        // User is not logged in, redirect to the login page
        res.redirect('/user/login');
    }
};

module.exports = requireLogin;
