const commentRepository = require("../repositories/commentRepository");

class CommentController {
    static async delete(req, res, next) {
        const comment_id = req.params.id

        try {
            await commentRepository.delete(comment_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        const comment = {
            comment_id: req.params.id, content: req.body.content
        }

        try {
            await commentRepository.update(comment)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    static async like(req, res, next) {
        const comment_id = req.params.id

        try {
            await commentRepository.add_like(comment_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    static async dislike(req, res, next) {
        const comment_id = req.params.id

        try {
            await commentRepository.add_dislike(comment_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CommentController