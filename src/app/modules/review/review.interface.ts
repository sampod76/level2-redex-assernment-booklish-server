import { Model } from 'mongoose';

export type IReview = {
  userEmail: string;
  userName: string;
  bookId: string;
  review: string;
};

export type ReviewModel = Model<IReview, Record<string, unknown>>;

export type IReviewFilters = {
  searchTerm?: string;
};
