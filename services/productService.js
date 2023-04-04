import Book from "../models/book.js"

const create = (bookData) => Book.create(bookData);

const getById = (bookId) => Book.findById(bookId).populate('wishingList');

const getAllfromCatalog = () => Book.find({}, { title: 1, image: 1, _id: 1, }).lean();

const updateOne = (bookId, data) => Book.findByIdAndUpdate(bookId, data);

const deleteOneProduct = (bookId) => Book.findByIdAndDelete(bookId);

export const productsServer = {
    create,
    getById,
    getAllfromCatalog,
    updateOne,
    deleteOneProduct
}