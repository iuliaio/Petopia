const requireAnonymous = (req, res, next) => {
    // Check if there is a valid user session with an 'id'
    if (req.session.user && req.session.user.id) {
        // User is logged in, redirect to main page
        res.redirect('/pets/');
    } else {
        // User is not logged in, therefore is allowed to go to that page
        next();
    }
};

module.exports = requireAnonymous;
