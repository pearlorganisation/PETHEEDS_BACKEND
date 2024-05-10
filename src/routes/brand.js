import express from "express";
import upload from "../middlewares/multer.js";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.js";
import { deleteBrand, getAllBrands, newBrand, updateBrand } from "../controllers/brand.js";


const router = express.Router();

router
  .route("/")
  .get(getAllBrands)
  .post(
    upload.single("brandBanner"),
    newBrand
  );

router
  .route("/:id")
  .delete(deleteBrand)
  .patch(
    upload.single("brandBanner"),
    updateBrand
  )
  
export default router;
