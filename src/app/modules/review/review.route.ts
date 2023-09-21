import express from 'express';
import { ReviewController } from './review.controller';

const router = express.Router();
router.route('/').get(ReviewController.getAllReviews);
router
  .route('/:id')
  .post(ReviewController.createReview)
  .get(ReviewController.getSingleReview);

export const ReviewRoutes = router;
