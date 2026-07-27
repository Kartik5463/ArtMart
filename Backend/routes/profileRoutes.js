import express from 'express'
import { changePassword, getAllPurchasedPhotos, getMe, updateProfile } from '../Controllers/profileController.js'
import protect from '../middlewares/authMiddleware.js'
import dest from "../middlewares/profile-imageMiddleware.js";
const router = express.Router()
router.get('/me',protect, getMe)
router.put(
  "/update",
  protect,
  dest.single("profileImg"),
  updateProfile
);
router.put('/change-password',changePassword)
router.get("/my-purchases", protect, getAllPurchasedPhotos);
export default router
