import { Book } from "../models/book.js"

function create(data) {
    let cube = Book(data);
    return cube.save();
}


async function getById(id) {
    return await Book.findById(id).lean()
}

async function getAllfromCatalog() {
    return await Book.find({}, { title: 1, image: 1, _id: 1, }).lean();
}

async function updateOne(productId, data) {
    return Book.updateOne({ _id: productId }, data)
}

async function deleteOneProduct(productId) {
    return Book.deleteOne({ _id: productId })
}


export const productsServer = {
    create,
    getAllfromCatalog,
    getById,
    updateOne,
    deleteOneProduct
}