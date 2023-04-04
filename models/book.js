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
        type: String,
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
    wishingList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});


 const Book = model('Books', bookSchema);

 export default Book;





