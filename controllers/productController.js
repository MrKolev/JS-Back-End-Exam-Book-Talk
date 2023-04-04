import { Router } from 'express';
import { productsServer } from '../services/productService.js'
import { isLogin, isOwner } from '../middlewares/auth.js';

const router = Router();

export function getErrorMessage(error) {
    let errorsArr = Object.keys(error.errors);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message
    }

}

router.get("/", (req, res) => res.render("home", { title: "Home" }));

router.get("/catalog", (req, res) => {
    productsServer.getAllfromCatalog()
        .then(books => {
            res.render("catalog", {
                books
            })
        })
});

router.get("/details/:bookId", async (req, res) => {
    try {
        let book = await productsServer.getById(req.params.bookId);

        const bookData = book.toObject();
        const isOwner = bookData.owner == req.user?._id;
        const wished = book.getWished();
        const isWished = req.user && wished.some(c => c._id == req.user?._id);

        res.render("books/details", { ...bookData, isOwner, isWished });
    } catch (error) {
        console.log(`details err : ${error}`);
        res.status(500).render("home", { title: "Home", error: getErrorMessage(error) });
    }
});

router.get("/create", isLogin, (req, res) => res.render("books/create", { title: "Create" }));

router.post("/create", isLogin, async (req, res) => {
    try {
        await productsServer.create(
            {
                ...req.body,
                owner: req.user._id
            }
        );
        res.redirect("/catalog");
    } catch (error) {
        res.render('books/create', { x: req.body, error: getErrorMessage(error) });
    }
});

router.get("/edit/:productId", isLogin, (req, res) => {
    productsServer.getById(req.params.productId)
        .then((book) => { res.render("books/edit", { book }) })
        .catch((error) => { res.status(500).render("home", { title: "Home", error: getErrorMessage(error) }); })
});

router.post("/edit/:productId", isLogin, (req, res) => {
    productsServer.updateOne(req.params.productId, req.body)
        .then((book) => res.redirect("details/" + book._id))
        .catch((error) => res.render('books/edit', { ...req.body, error: getErrorMessage(error) }));
});

router.get("/delete/:bookId", isLogin, isOwner, (req, res) => {
    productsServer.deleteOneProduct(req.params.bookId)
        .then(() => { res.redirect("/catalog") })
        .catch((error) => { res.status(500).render("home", { title: "Home", error: getErrorMessage(error) }) })
});

router.get("/wish/:bookId", isLogin, async (req, res) => {
    try {
        let book = await productsServer.getById(req.params.bookId);
        book.wishingList.push(req.user._id);
        await book.save();
        res.redirect("/details/" + book._id);
    } catch (error) {
        res.render("/details/" + book._id, { ...book, error: getErrorMessage(error) });
    }
});

export { router as productController };