class ReviewController {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    async index(req, res, next) {
        if (req.session.user === undefined) {
            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/' : referer);
            return;
        }

        const user_id = req.params.id;

        try {
            const reviews = await this.reviewRepository.all(user_id)
            res.render('reviewPage', {reviews: reviews, sender_id: req.session.user.id, receiver_id: user_id})
        } catch (err) {
            next(err)
        }
    }

    async add_review(req, res, next) {
        const review = {
            receiver_id: req.body.receiver_id,
            sender_id: req.session.user.id,
            rating: req.body.rating,
            comment: req.body.comment
        }

        let user_id = req.session.user.id

        if (review.comment === "" || review.sender_id === review.receiver_id || review.rating === "") {
            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/review/' + user_id : referer);
            return;
        }

        try {
            await this.reviewRepository.add_review(review)

            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/review/' + user_id : referer);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ReviewController;
