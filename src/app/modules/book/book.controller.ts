import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IBook } from './book.interface';
import { BookService } from './book.service';
import { BookFilterableFields } from './book.constant';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await BookService.createBookFromDb(data);
    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Book created successfully!`,
      data: result,
    });
  }
);

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getAllBooksFromDb(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book get successfully!',
    meta: result.meta,
    data: result.data || null,
  });
});

const UpdatedBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.UpdatedBooksFromDb();
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books update successfully',
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBookFromDb(req.params.id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book update successfully',
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body.newData;
  const result = await BookService.updateBookFromDb(req.params.id, updatedData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBookFromDb(req.params.id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  UpdatedBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
