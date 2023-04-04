import { Router } from "express";
import { config } from "../config/config.js";
import { isLogin, notLogin } from "../middlewares/auth.js";
import { authService } from "../services/authService.js";
import { getErrorMessage } from "./productController.js";

const router = Router();

router.get('/logout', isLogin, (req, res) => {
    res.clearCookie(config.TOKEN_NAME)
        .redirect("/")
})

router.get('/login', notLogin, (req, res) => res.render("user/login", { title: "Login" }));

router.post('/login', notLogin, async (req, res) => {
    const password = req.body.password;
    const email = req.body.email.trim();
    try {
        if (!email || !password) throw "Fill in all the fields.";
        const user = await authService.login(email);
        if (!user) throw "Wrong password or username!";
        if (!(await user.validatePassword(password))) throw "Wrong password or username!";

        res.cookie(config.TOKEN_NAME, user.createToken());
        res.redirect("/")
    } catch (error) {
        res.render("user/login",
            {
                title: "Login",
                email,
                error
            }
        );
    }
})

router.get('/register', notLogin, (req, res) => res.render("user/register", { title: "Register" }));

router.post('/register', notLogin, async (req, res) => {
    let {
        email,
        username,
        password,
        repeatPassword
    } = req.body;

    email = email.trim();
    username = username.trim();

    try {
        if (!username, !password, !repeatPassword) throw { message: "Please fill in all fields.", errors: [] }
        if (password !== repeatPassword) throw { message: "The passwords do not match.", errors: [] }

        if (authService.userCheck(username)) throw { message: "Username already exists!", errors: [] }
        if (authService.emailCheck(email)) throw { message: "Email address is already associated with another user!", errors: [] }

        const user = await authService.register({ username, password, email });
        const token = authService.createToken(user);
        res.cookie(config.TOKEN_NAME, token);
        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.render("user/register", {
            title: "Register",
            error: getErrorMessage(error),
            email,
            username
        })
    }
})


export { router as authControler };