import express from "express";
const router = express.Router();

import protect from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

import {
  decreaseLikeController,
  editPhoto,
  getAllRequiredPhotos,
  getPhoto,
  getPortfolio,
  increaseLikeController,
  removePhoto,
  searchPhotosByTag,
  sellingPhotos,
  updateSaleStatus,
  uploadnewPhoto,
} from "../Controllers/photoController.js";

router.post("/", protect, upload.single("photo"), uploadnewPhoto);
router.get("/", protect, getAllRequiredPhotos);
router.get("/sale", protect, sellingPhotos);
router.get("/search", protect, searchPhotosByTag);
router.get("/portfolio/:id", protect, getPortfolio);
router.get("/:id", protect, getPhoto);
router.put("/:id", protect, editPhoto);
router.patch("/:id/sale", protect, updateSaleStatus);
router.delete("/:id", protect, removePhoto);

router.patch("/like/:id",protect,increaseLikeController);
router.patch("/unlike/:id",protect,decreaseLikeController);
export default router;