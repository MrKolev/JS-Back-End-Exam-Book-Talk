import express from "express";
import { config } from "./config/config.js";
import { setupExpress } from "./config/express.js";
import { setupMongoose } from "./config/mongoose.js";
import { routers } from "./routes.js";

const app = express();
setupExpress(app);
setupMongoose(app);

app.use(routers);

app.listen(config.PORT, ()=> console.log(`The app is running on http://localhost:${config.PORT}`));