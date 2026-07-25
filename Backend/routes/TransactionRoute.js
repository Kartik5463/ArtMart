import express from "express";
import {
  buyPhoto,
  getPurchaseHistory,
  getSalesHistory,
  getPhotoPurchases,
  cancelPurchase,
} from "../Controllers/transactionController.js";

import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();


router.post("/buy/:photoId", authMiddleware, buyPhoto);


router.get("/purchases", authMiddleware, getPurchaseHistory);


router.get("/sales", authMiddleware, getSalesHistory);


router.get("/photo/:photoId", authMiddleware, getPhotoPurchases);

router.delete("/:transactionId", authMiddleware, cancelPurchase);

export default router;