import express from "express";
import { generateDescription } from "../Controllers/DescriptionController.js";
import protect from "../middlewares/authMiddleware.js";
import { generatePrice } from "../Controllers/PriceGeneratorController.js";
const router = express.Router();

router.post("/description",protect,generateDescription);
router.post("/price",protect,generatePrice);
export default router;