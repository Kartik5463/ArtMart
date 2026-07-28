import express from "express";
import { generateDescription } from "../Controllers/DescriptionController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/description",protect,generateDescription);

export default router;