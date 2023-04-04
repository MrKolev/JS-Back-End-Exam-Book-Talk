import { model, Schema } from "mongoose";
import { config } from "../config/config.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
    },
});

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, config.SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        });
});

userSchema.method("validatePassword", function (password) {
    return bcrypt.compare(password, this.password)
})

userSchema.method("createToken", function () {
    return sign({ _id: this._id, name: this.username }, config.SECRET_TOKEN)
})

const User = model("User", userSchema);
export default User;
