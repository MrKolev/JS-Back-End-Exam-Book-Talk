import Book from "../models/book.js"
import User from "../models/uresrs.js";

function create(data, userId) {
    let cube = Book(data);
    cube.owner.push(userId);
    return cube.save();
}


async function getById(_id) {
    return await Book.findOne({ _id }).lean();
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

async function isOwner(userId, id) {
    try {
        let product = await Book.findOne({ _id: id }, {owner:1 }).populate([{ path: "User", strictPopulate: false }]);
        if (product.owner.includes(userId)) {
            return true
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return error
    }

}
async function bookIsNotInWishList(userId, id) {
    try {
        let product = await Book.findOne({ _id: id }).populate([{ path: "User", strictPopulate: false }]);
        if (product.wishingList.includes(userId)) {
            return false
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
        return error
    }

}

async function addWishingList(bookId, userId) {
    try {
        const book = await Book.findOne({ _id: bookId });
        const user = await User.findOne({ _id: userId });
        book.wishingList.push(user);
        await book.save();
    } catch (error) {
        console.log(error.message);
    }
}


export const productsServer = {
    create,
    getAllfromCatalog,
    getById,
    updateOne,
    deleteOneProduct,
    isOwner,
    addWishingList,
    bookIsNotInWishList
}