import { config } from "../config/config.js"
import { User } from "../models/uresrs.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;



const token = (user) => {
    let options = { _id: user._id }
    if(user.admin){
        options.admin = user.admin;
        options.name = user.name;
    }
    if(user.guest){
        options.guest = user.guest;
        options.name = user.name;
    }
    return sign(options, config.SECRET_TOKEN)
}

async function login(username, password) {
    const user = await User.findOne({ name: username });
    if (!user) throw { message: "nWrong password or username!" }
    if (!(await bcrypt.compare(password, user.password))) throw { message: "pWrong password or username!" }
    return token(user);
}

async function userCheck(username) {
    const user = await User.findOne({ name: username });
    if (user) throw { message: "Username already exists!" }
}

async function emailCheck(email) {
    const user = await User.findOne({ email: email });
    if (user) throw { message: "Email address is already associated with another user!" }
}

async function register(name, password, email) {

    let salt = await bcrypt.genSalt(config.SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        password: hash,
        email,
    })

    return token(user.save());
}

export const authService = {
    register,
    login,
    userCheck,
    emailCheck
}