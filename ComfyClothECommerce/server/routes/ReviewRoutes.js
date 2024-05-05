import express from 'express';
import auth from "../middleware/auth.js"
import { addReview, getReviewsByProductId, likeReview, dislikeReview } from '../controller/reviewController.js';

const router = express.Router();

router.route("/:productId/reviews").get(getReviewsByProductId);
router.route("/:productId/reviews/add").post(addReview);
router.route("/like/:reviewId").patch(auth, likeReview);
router.route("/dislike/:reviewId").patch(auth, dislikeReview);

export default router;