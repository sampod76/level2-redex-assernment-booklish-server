"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponce_1 = __importDefault(require("../../shared/sendResponce"));
const pick_1 = __importDefault(require("../../shared/pick"));
const book_services_1 = require("./book.services");
const book_model_1 = require("./book.model");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BookData = req.body;
    const result = yield book_services_1.BookService.createBook(BookData);
    (0, sendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Book created successfully!',
        data: result,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_services_1.BookService.getSingleBooks(id);
    console.log(id, 'id');
    (0, sendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Book retrieved successfully !',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const email = req.query.email;
    // console.log(id, email);
    const result = yield book_services_1.BookService.deleteBook(id, email);
    if (result) {
        (0, sendResponce_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Book deleted successfully !',
            data: result,
        });
    }
}));
const updateBook = (0, catchAsync_1.default)((0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield book_services_1.BookService.updateBook(id, updatedData);
    (0, sendResponce_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
})));
const BookFilterableFields = ['searchTerm', 'title', 'genre', 'author'];
const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];
const getBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({}).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Books retrieved successfully ',
        data: result,
    });
}));
const getALLBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, BookFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields);
    const result = yield book_services_1.BookService.getALLBook(filters, paginationOptions);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Books retrieved successfully ',
        meta: result.meta,
        data: result.data,
    });
}));
const postReviews = (0, catchAsync_1.default)((0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const review = req.body.review;
    const result = yield book_services_1.BookService.postReview(bookId, review);
    (0, sendResponce_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
})));
const getReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('bbbbbbbbbbbbbbbbbbb');
    const bookId = req.params.id;
    const result = yield book_model_1.Book.findById(bookId).select({
        _id: 1,
        reviews: 1,
        title: 1,
    });
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Books retrieved successfully ',
        data: result,
    });
}));
exports.BookController = {
    createBook,
    getALLBook,
    updateBook,
    getSingleBook,
    deleteBook,
    getBook,
    postReviews,
    getReview,
};
