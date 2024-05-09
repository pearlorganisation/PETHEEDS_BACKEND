import express from "express";
import upload from "../middlewares/multer.js";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";
import {
  deleteProduct,
  getAllProducts,
  getParticularProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();
router
  .route("/")
  .get(getAllProducts)
  .post(
    upload.fields([{ name: "productImg" }, { name: "gallery" }, {name: "productBanner"}]),
    newProduct
  );

router
  .route("/:id")
  .delete(deleteProduct)
  .patch(
    upload.fields([{ name: "productImg" }, { name: "gallery" }, {name: "productBanner"}]),
    updateProduct
  )
  .get(getParticularProduct);
export default router;
