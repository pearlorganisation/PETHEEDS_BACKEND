import express from "express";
import { upload } from "../config/cloudinary.js";

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
    upload.fields([{ name: "productImg" }, { name: "gallery" }]),
    newProduct
  );

router
  .route("/:id")
  .delete(deleteProduct)
  .patch(
    upload.fields([{ name: "productImg" }, { name: "gallery" }]),
    updateProduct
  )
  .get(getParticularProduct);
export default router;
