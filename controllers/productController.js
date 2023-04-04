import { Router } from 'express';
import { productsServer } from '../services/productService.js'
import { isLogin } from '../middlewares/auth.js';
import { authService } from '../services/authService.js';

const router = Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
    });
})

router.get("/catalog", (req, res) => {
    productsServer.getAllfromCatalog()
        .then(books => {
            res.render("catalog", {
                books
            })
        })
})

router.get("/create", isLogin, (req, res) => {
    res.render("create", {
        title: "Create"
    })
})

router.get("/read/:productId", isLogin, async (req, res) => {
    const userId = req.user._id;
    const bookId = req.params.productId;

    await productsServer.addWishingList(bookId, userId);
    res.redirect("/details/" + bookId);

})

router.get("/edit/:productId", isLogin, async (req, res) => {
    console.log(req.params.productId);
    let products = await productsServer.getById(req.params.productId);
    res.render("edit", {
        title: "Edit",
        products
    });
})

router.get("/details/:productId", async (req, res) => {
    const productId = req.params.productId;
    try {
        let products = await productsServer.getById(productId);

        if (req.user) {
            const userId = req.user._id;
            products.isOwner = await productsServer.isOwner(userId, productId);
            products.showWishBtn = await productsServer.bookIsNotInWishList(userId, productId);
        }

        res.render("details", {
            title: "Details",
            products
        });
    } catch (error) {
        console.log(`details err : ${error}`);
    }

})

// router.get("/:productId/delete", isLogin, async (req, res) => {
//     const product = await productsServer.getById(req.params.productId)
//     console.log(product);
//     res.render("deleteCube", {
//         title: "Delete Cube",
//         product
//     });
// });

// router.post("/:productId/delete", (req, res) => {
//     productsServer.deleteOneProduct(req.params.productId)
//         .then(() =>
//             res.redirect(`/products`))
//         .catch((error) => {
//             console.log(error);
//             res.status(404).render("404");
//         });
// })



router.post("/create", isLogin, async (req, res) => {
    const { title, author, genre, stars, image, bookReview } = req.body;
    try {
        if (!title || !author || !genre || !stars || !image || !bookReview) {
            throw { message: "Please fill in all fields." };
        }

        await productsServer.create({
            title,
            author,
            image,
            bookReview,
            genre,
            stars
        }, req.user._id);
        res.redirect("/catalog")
    } catch (error) {
        console.log(error);
        res.status(404).render("404");
    }
})

router.post("/edit/:productId", isLogin, (req, res) => {
    console.log("OK");
    productsServer.updateOne(req.params.productId, req.body)
        .then(() => res.redirect("/details/" + req.params.productId))
        .catch((error) => {
            console.log(error);
            res.status(500).render("500");
        });
})

export { router as productController };