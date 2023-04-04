import mongoose, { model, Schema } from "mongoose";

const bookSchema = new Schema({

    title: {
        type: String,
        required: true,
        minLength: 2,
    },
    author: {
        type: String,
        required: true,
        minLength: 5,
    },
    image: {
        type: String,
        required: true,
        match: /^(http:\/\/|https:\/\/)/
    },
    bookReview: {
        type: String,
        required: true,
        minLength: 10,
    },
    genre: {
        type: String,
        required: true,
        minLength: 3,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    wishingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
    owner: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]
});

bookSchema.method('getWished', function () {
    return this.wishingList.map(x => x._id);
})


const Book = model('Books', bookSchema);

export default Book;





