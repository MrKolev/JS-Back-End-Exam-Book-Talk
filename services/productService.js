import { Book } from "../models/book.js"

function create(data) {
    let cube = Book(data);
    return cube.save();
}

function getById(id) {
    return Book.findById(id).lean();
}
function getByIdWithAccessory(id) {
    return Book.findById(id)
        .populate("accessories")
        .lean();
}

async function getAll(query) {
    let products = null;
    if (query.from || query.to) {
        products = await Book.find({ difficultyLevel: { $gte: query.from, $lte: query.to } }).lean();
    } else {
        products = await Book.find({}).lean();
    }

    if (query.search) products = products.filter(x => x.name.includes(query.search))
    return products
}

async function updateOne(productId, data) {
    return Book.updateOne({ _id: productId }, data)
}

async function deleteOneProduct(productId) {
    return Book.deleteOne({ _id: productId })
}


export const productsServer = {
    create,
    getAll,
    getById,
    getByIdWithAccessory,
    updateOne,
    deleteOneProduct
}