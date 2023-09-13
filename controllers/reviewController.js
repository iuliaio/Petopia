class ReviewController {
    constructor(userRepository, reviewRepository) {
        this.userRepository = userRepository
        this.reviewRepository = reviewRepository;
    }

    async index(req, res, next) {
        if (req.session.user === undefined) {
            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/' : referer);
            return;
        }

        const user_id = req.params.id;
        const user = await this.userRepository.getById(user_id)

        if (user.charity_id === "") {
            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/user/account/' + user_id : referer);
        }

        try {
            const reviews = await this.reviewRepository.all(user_id)
            res.render('reviewPage', {
                reviews: reviews, sender_id: req.session.user.id, receiver_id: user_id, shelter: user
            })
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

        if (review.rating === undefined) review.rating = 5;

        if (review.comment === "" || review.sender_id === review.receiver_id) {
            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/review/' + user_id : referer);
            return;
        }

        try {
            let review_exists = await this.reviewRepository.review_exists(review.sender_id, review.receiver_id)
            if (review_exists === undefined) {
                await this.reviewRepository.add_review(review)
            }

            const referer = req.header('Referer');
            res.redirect(referer === undefined ? '/review/' + user_id : referer);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ReviewController;
