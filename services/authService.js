import { config } from "../config/config.js"
import User from "../models/uresrs.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;



function createToken(user){
    const options = {
        _id: user._id,
        name: user.username
    }

    return sign(options, config.SECRET_TOKEN)
}

async function login(email, password) {
    try {
        const user = await User.findOne({ email });
        if (!user) throw { message: "Wrong password or username!" }
        if (!(await bcrypt.compare(password, user.password))) throw { message: "Wrong password or username!" }
        return user;
    } catch (error) {
        throw { message: error.message }
    }
}

async function userCheck(username) {
    const user = await User.findOne({ username });
    if (user) throw { message: "Username already exists!" }
}

async function emailCheck(email) {
    const user = await User.findOne({ email });
    if (user) throw { message: "Email address is already associated with another user!" }
}

async function register(username, password, email) {
    try {
        let salt = await bcrypt.genSalt(config.SALT_ROUNDS);
        let hash = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            password: hash,
            email,
        })
        return user.save()
    } catch (error) {
        console.log("error.message66666666666666666666666666");
        return error
    }
}

async function getUser(id) {
    return await User.findById(id);
}

export const authService = {
    register,
    login,
    userCheck,
    emailCheck,
    getUser,
    createToken
}