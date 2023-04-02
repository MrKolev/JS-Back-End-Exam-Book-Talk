import { Router } from "express";
import { config } from "../config/config.js";
// import { isLogin, notLogin } from "../middlewares/auth.js";
import { authService } from "../services/authService.js";

const router = Router();

// router.get('/logout', isLogin, (req, res) => {
//     res.clearCookie(config.TOKEN_NAME)
//         .redirect("/")
// })

router.get('/login', (req, res) => {
    res.render("login", {
        title: "Login"
    })
})

router.get('/register', (req, res) => {
    res.render("register", {
        title: "Register",
    })

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {

        if (!email || !password) throw { message: "Fill in all the fields." }

        let token = await authService.login(email, password);

        res.cookie(config.TOKEN_NAME, token);

        res.redirect("/")

    } catch (error) {
        res.render("login", {
            title: "Error Login",
            error
        })
    }
})

router.post('/register', async (req, res) => {
    const {
        email,
        username,
        password,
        repeatPassword
    } = req.body

    try {
        if (password !== repeatPassword) throw { message: "The passwords do not match." }
        if (!username, !password, !repeatPassword) throw { message: "Please fill in all fields." }

        await authService.userCheck(username);
        await authService.emailCheck(email);

        let token = await authService.register(username, password, email);

        res.cookie(config.TOKEN_NAME, token);

        res.redirect("/");

    } catch (error) {
        res.render("register", {
            title: "Register",
            error

        })
    }
})


export { router as authControler };