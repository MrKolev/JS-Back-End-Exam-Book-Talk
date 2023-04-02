import jwt from 'jsonwebtoken';
import { config } from "../config/config.js";
const { verify } = jwt;



export function auth() {
    return (req, res, next) => {
        try {
            let token = req.cookies[config.TOKEN_NAME];
            if (token) {
                let verifycode = verify(token, config.SECRET_TOKEN)
                req.user = verifycode;
                res.locals.user = verifycode;
                res.locals.admin = verifycode.admin;

            }
            next();
            
        } catch (error) {
            res.clearCookie(config.TOKEN_NAME)
                .status(401)
                .render('401')
        }

    }

}

export function isLogin(req, res, next) {
    if(req.user){
        next();
    }else{
        res.redirect("/auth/login")
    }
}

export function notLogin(req, res, next) {
    if(!req.user){
        next();
    }else{
        res.redirect("/")
    }
}

export function isCreator(req, res, next) {
    const productId = req.params.productId;

    if(req.user.id === productId){
        next();
    }else{
        res.redirect("/")
    }
}

export function isAdmin(req, res, next) {
    if(req.user.admin){
        next();
    }else{
        res.redirect("/")
    }
}

