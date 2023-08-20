class CommentController {
    constructor(commentRepository) {
        this.commentRepository = commentRepository
    }

    async delete(req, res, next) {
        const comment_id = req.params.id

        try {
            await this.commentRepository.delete(comment_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        const comment = {
            comment_id: req.params.id, content: req.body.content
        }

        try {
            await this.commentRepository.update(comment)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async like(req, res, next) {
        const comment_id = req.params.id

        try {
            await this.commentRepository.add_like(comment_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async dislike(req, res, next) {
        const comment_id = req.params.id

        try {
            await this.commentRepository.add_dislike(comment_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CommentController