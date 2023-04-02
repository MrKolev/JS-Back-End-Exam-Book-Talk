import mongoose, { model, Schema } from "mongoose";

const bookSchema = new Schema({

    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    bookReview: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    // •	WishingList – a collection of Users (a reference to the User model)
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    // •	Owner - object Id (a reference to the User model)
    owner: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
});

export const Book = model('Book', bookSchema);






