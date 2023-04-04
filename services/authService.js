import User from "../models/uresrs.js"

const login = (email) => User.findOne({email});

const userCheck = (username) => User.findOne({ username });

const emailCheck = (email) => User.findOne({ email });

const register = (dataUser) => User.create(dataUser);

export const authService = {
    register,
    login,
    userCheck,
    emailCheck
}