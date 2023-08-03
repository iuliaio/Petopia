class ForumController {

    // The main page where all posts are listed ordered descending by the publication date
    static index(req, res, next) {
        try {
            //Get all posts
            res.render('TODO');
        } catch (err) {
            next(err)
        }
    }

    // A form to create a new post
    static create(req, res) {
        res.render('TODO');
    }

    // Function to store the newly created post
    static store(req, res, next) {
        // Get the post from the req body
        try {
            // Insert the post
            // Redirect
        } catch (err) {
            next(err)
        }
    }

    // Show a single post
    static show(req, res, next) {
        try {
            // Get the post
            // Get all the comments
            res.render('TODO');
        } catch (err) {
            next(err)
        }
    }

    // Form to edit the post
    static edit(req, res, next) {
        try {
            //Get the post
            res.render('TODO');
        } catch (err) {
            next(err)
        }

    }

    // Function to update the post
    static update(req, res, next) {
        // Get the post from the req body
        try {
            // Update the post
            // Redirect
        } catch (err) {
            next(err)
        }

    }

    // Function to delete the post
    static destroy(req, res, next) {
        try {
            // Delete the post
            // Redirect
        } catch (err) {
            next(err)
        }

    }

    // Function to add a like
    static like(req, res, next) {
        try {
            // Add like from user to the post
            // Redirect
        } catch (err) {
            next(err)
        }

    }

    // Function to add a comments to a post
    static comment(req, res, next) {
        // Get the comment from the req body
        try {
            // Add comment to post
            // Redirect
        } catch (err) {
            next(err)
        }

    }

}

module.exports = ForumController