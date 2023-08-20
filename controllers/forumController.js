class ForumController {
    constructor(forumRepository, commentRepository) {
        this.forumRepository = forumRepository
        this.commentRepository = commentRepository
    }

    async index(req, res, next) {
        try {
            const posts = await this.forumRepository.all();
            res.render('TODO', {posts: posts});
        } catch (err) {
            next(err)
        }
    }

    create(req, res) {
        res.render('TODO');
    }

    async store(req, res, next) {
        const post = {
            title: req.body.title, content: req.body.content, user_id: req.session.user.id
        }

        try {
            await this.forumRepository.insert(post)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async show(req, res, next) {
        const post_id = req.params.id

        try {
            const post = await this.forumRepository.get(post_id)
            const comments = this.commentRepository.allByPost(post_id);
            res.render('TODO', {post: post, comments: comments});
        } catch (err) {
            next(err)
        }
    }

    async edit(req, res, next) {
        const post_id = req.params.id

        try {
            const post = await this.forumRepository.get(post_id)
            res.render('TODO', {post: post});
        } catch (err) {
            next(err)
        }
    }

    async update(req, res, next) {
        const post = {
            id: req.params.id, title: req.body.title, content: req.body.content, user_id: req.session.user.id
        }

        try {
            await this.forumRepository.update(post)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async destroy(req, res, next) {
        const post_id = req.params.id

        try {
            await this.forumRepository.delete(post_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    async like(req, res, next) {
        const post_id = req.params.id

        try {
            await this.forumRepository.add_like(post_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }

    }

    async dislike(req, res, next) {
        const post_id = req.params.id

        try {
            await this.forumRepository.add_dislike(post_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }

    }

    async add_comment(req, res, next) {
        const comment = {
            post_id: req.params.id, user_id: req.session.user.id, content: req.body.content
        }

        try {
            await this.forumRepository.insert(comment)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

}

module.exports = ForumController