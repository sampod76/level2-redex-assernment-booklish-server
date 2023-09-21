import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const BookSchema = new Schema<IBook>(
  {
    tittle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    review: {
      type: String,
    },
    authorGmail: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>('Book', BookSchema);
