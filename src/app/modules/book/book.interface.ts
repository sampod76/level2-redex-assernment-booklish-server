import { Model } from 'mongoose';

export type IBook = {
  tittle: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  price: number;
  review?: string;
  authorGmail: string;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  searchTerm?: string;
  _id?: string;
  title?: string;
  author?: string;
  genre?: string;
};
