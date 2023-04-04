import Book from "../models/book.js";
import User from "../models/uresrs.js"

const login = (email) => User.findOne({email});

const userCheck = (username) => User.findOne({ username }).lean();

const emailCheck = (email) => User.findOne({ email });

const register = (dataUser) => User.create(dataUser);

const getMyWishBook = (userId) => Book.find({ wishingList: userId}).lean();

export const authService = {
    register,
    login,
    userCheck,
    emailCheck,
    getMyWishBook
}