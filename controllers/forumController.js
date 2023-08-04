const forumRepository = require('../repositories/forumRepository')
const commentRepository = require('../repositories/commentRepository')

class ForumController {
    static async index(req, res, next) {
        try {
            const posts = await forumRepository.all();
            res.render('TODO', {posts: posts});
        } catch (err) {
            next(err)
        }
    }

    static create(req, res) {
        res.render('TODO');
    }

    static async store(req, res, next) {
        const post = {
            title: req.body.title, content: req.body.content, user_id: req.session.user.id
        }

        try {
            await forumRepository.insert(post)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    static async show(req, res, next) {
        const post_id = req.params.id

        try {
            const post = await forumRepository.get(post_id)
            const comments = commentRepository.allByPost(post_id);
            res.render('TODO', {post: post, comments: comments});
        } catch (err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        const post_id = req.params.id

        try {
            const post = await forumRepository.get(post_id)
            res.render('TODO', {post: post});
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        const post = {
            id: req.params.id, title: req.body.title, content: req.body.content, user_id: req.session.user.id
        }

        try {
            await forumRepository.update(post)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    static async destroy(req, res, next) {
        const post_id = req.params.id

        try {
            await forumRepository.delete(post_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

    static async like(req, res, next) {
        const post_id = req.params.id

        try {
            await forumRepository.add_like(post_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }

    }

    static async dislike(req, res, next) {
        const post_id = req.params.id

        try {
            await forumRepository.add_dislike(post_id)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }

    }

    static async add_comment(req, res, next) {
        const comment = {
            post_id: req.params.id, user_id: req.session.user.id, content: req.body.content
        }

        try {
            await forumRepository.insert(comment)
            res.redirect('TODO')
        } catch (err) {
            next(err)
        }
    }

}

module.exports = ForumController