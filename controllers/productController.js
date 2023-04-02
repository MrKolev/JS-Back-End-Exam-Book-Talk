import { Router } from 'express';
import { productsServer } from '../services/productService.js'
import { isLogin } from '../middlewares/auth.js';

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

// router.get("/:productId/attach", isLogin, async (req, res) => {
//     let product = await productsServer.getById(req.params.productId);
//     let accessories = await accessoriesServer.getNameAndId(product.accessories);

//     res.render("attachAccessory", {
//         product,
//         accessories,
//         title: "Attach accessory"
//     });
// })

router.get("/edit/:productId", isLogin, async (req, res) => {
    console.log(req.params.productId);
    let products= await productsServer.getById(req.params.productId);
    res.render("edit", {
        title: "Edit",
        products
    });
})

router.get("/details/:productId", async (req, res) => {
    let products = await productsServer.getById(req.params.productId);

    let userId = null;

    if (req.user) {
        userId = req.user._id;
    }

    if (products.owner.toString() == userId) {
        products.isOwner = true;
    }

    if(products.wishingList.includes(userId)){
        products.isWished = true;
    }else{
        products.isWished = false;
    }

    res.render("details", {
        title: "Details",
        products,
    });

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

// router.post("/:productId/attach", isLogin, async (req, res) => {
//     productsServer.attachAccessory(req.params.productId, req.body)
//         .then((product) =>
//             res.redirect(`/products/details/${req.params.productId}`))
//         .catch((error) => {
//             console.log(error);
//             res.status(500).render("500");
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
            stars,
            owner: req.user._id
        });
        res.redirect("/catalog")
    } catch (error) {
        console.log(error);
        res.status(404).render("404");
    }
})

router.post("/edit/:productId",isLogin, (req, res) => {
    productsServer.updateOne(req.params.productId, req.body)
        .then(() => res.redirect("/products/details/" + req.params.productId))
        .catch((error) => {
            console.log(error);
            res.status(500).render("500");
        });
})

export { router as productController };