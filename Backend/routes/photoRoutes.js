import express from "express";
const router = express.Router();
import protect from "../middlewares/authMiddleware.js";
import { editPhoto, getAllRequiredPhotos, getPhoto, getPortfolio, removePhoto, searchPhotosByTag, sellingPhotos, updateSaleStatus, uploadnewPhoto } from "../Controllers/photoController.js";
// Protect all routes below

router.get("/", protect,getAllRequiredPhotos);
router.get("/sale",protect, sellingPhotos);
router.get("/search",protect, searchPhotosByTag);
router.get("/portfolio/:id",protect, getPortfolio);
router.get("/:id",protect, getPhoto);

router.post("/",protect, uploadnewPhoto);
router.put("/:id",protect, editPhoto);//replaces the data
router.patch("/:id/sale",protect, updateSaleStatus);//updates the given data
router.delete("/:id",protect, removePhoto);

export default router;