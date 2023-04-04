import { Router } from 'express';
import { authControler } from './controllers/authControler.js';
import { productController } from './controllers/productController.js';

export const routers = Router();

routers.use("/", productController);
routers.use("/auth", authControler);
routers.use("/products", productController);

routers.get("*", (req, res) => {
    res.render("404")
})
