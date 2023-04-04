import { model, Schema } from "mongoose";

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

const User = model("User", userSchema);
export default User;
