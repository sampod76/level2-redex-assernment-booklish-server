import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IReview } from './review.interface';
import { ReviewFilterableFields } from './review.constant';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  
  const { ...reviewData } = req.body;
  const result = await ReviewService.createReviewFromDb(
    reviewData
  );

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});


const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query,ReviewFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ReviewService.getAllReviewsFromDb(filters, paginationOptions);

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    meta: result.meta,
    data: result.data || null,
  });
});


const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const result = await ReviewService.getSingleReviewFromDb(id);

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});


export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
};
