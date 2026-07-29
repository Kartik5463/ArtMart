import express from "express";
import  protect  from "../middlewares/authMiddleware.js";
import {
  addCommentController,
  getCommentsController,
  deleteCommentController,
  updateCommentController,
} from "../Controllers/commentController.js";

const router = express.Router();

router.post("/add-comment/:photoId", protect, addCommentController);
router.get("/all/:photoId",protect, getCommentsController);
router.patch("/update-comment/:commentId", protect, updateCommentController);
router.delete("/delete-comment/:commentId", protect, deleteCommentController);

export default router;