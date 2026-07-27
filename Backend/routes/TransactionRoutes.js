import express from "express";
import {
  buyPhotographController,
  cancelPurchaseController,
  getPhotoPurchasesController,
  getPurchaseHistoryController,
  getSalesHistoryController,
} from "../Controllers/transactionController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/buy", protect, buyPhotographController);


router.get("/purchases", protect, getPurchaseHistoryController);


router.get("/sales", protect, getSalesHistoryController);


router.get("/photo/:photoId", protect, getPhotoPurchasesController);

router.delete("/:transactionId",protect, cancelPurchaseController);

export default router;