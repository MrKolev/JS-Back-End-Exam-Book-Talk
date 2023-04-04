import { config } from "../config/config.js"
import  User  from "../models/uresrs.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;



const token = (user) => {
    let options = { _id: user._id,
    name: user.username}
    
    return sign(options, config.SECRET_TOKEN)
}

async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw { message: "Wrong password or username!" }
    if (!(await bcrypt.compare(password, user.password))) throw { message: "Wrong password or username!" }
    return token(user);
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

    let salt = await bcrypt.genSalt(config.SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({
        username,
        password: hash,
        email,
    })

    return token(user.save());
}

async function getUser(id){
    return await User.findById(id);
}

export const authService = {
    register,
    login,
    userCheck,
    emailCheck,
    getUser
}