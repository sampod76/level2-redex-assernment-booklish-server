import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();
router
  .route('/')
  .get(BookController.getAllBooks)
  .post(BookController.createBook);
router
  .route('/:id')
  .get(BookController.getSingleBook)
  .patch(BookController.updateBook)
  .delete(BookController.deleteBook);

router.get('/updated-books', BookController.UpdatedBooks);



export const BookRoutes = router;
