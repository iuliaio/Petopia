const express = require("express");
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin')

const ReviewController = require("../controllers/reviewController");
const ReviewRepository = require("../repositories/reviewRepository");
const UserRepository = require("../repositories/userRepository")

const userRepository = new UserRepository(db)
const reviewRepository = new ReviewRepository(db);
const reviewController = new ReviewController(userRepository, reviewRepository);

router.get("/:id", requireLogin, reviewController.index.bind(reviewController));
router.post("/", requireLogin, reviewController.add_review.bind(reviewController));

module.exports = router;
