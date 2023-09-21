import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IReview, IReviewFilters } from './review.interface';
import { ReviewSearchableFields } from './review.constant';
import { Review } from './review.model';


const createReviewFromDb = async (
  payload: IReview
): Promise<IReview> => {
  
  const result = await Review.create(payload);
  return result;
};

const getAllReviewsFromDb = async (
  filters: IReviewFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IReview[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: ReviewSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Review.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const getSingleReviewFromDb = async (id: string) => {
  const result = await Review.find({ bookId: id });
  return result;
};


export const ReviewService = {
  createReviewFromDb,
  getAllReviewsFromDb,
  getSingleReviewFromDb,
}
