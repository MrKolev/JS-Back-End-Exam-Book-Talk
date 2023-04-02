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
            }
            next();

        } catch (error) {
            res.clearCookie(config.TOKEN_NAME)
                .status(401)
                .render("home", {
                    title: "Home",
                    error
                });
        }

    }

}

export function isLogin(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(403)
            .render("/auth/login")
    }
}

export function notLogin(req, res, next) {
    if (!req.user) {
        next();
    } else {
        res.status(404)
            .render("404")
    }
}


