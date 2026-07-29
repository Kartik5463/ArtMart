import {
  addNewComment,
 fetchCommentsForPhoto,
  deleteComment,
  updateComment,
} from "../services/commentService.js";

export const addCommentController = async (req, res) => {
  const { photoId } = req.params;
  const { text } = req.body;
  const userId = req.id;

  try {
    const comment = await addNewComment(photoId, userId, text);
    res.status(201).json({
        success:true,message:"Comment Added Successfully",
        comment});
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "Comment text is required") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

export const getCommentsController = async (req, res) => {
  const { photoId } = req.params;

  try {
    const comments = await fetchCommentsForPhoto(photoId);
   res.status(200).json({
        success:true,message:"Comments Fetched Successfully",
        comments});
  
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCommentController = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.id;

  try {
    await deleteComment(commentId, userId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    if (err.message === "Comment not found") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "Not authorized to delete this comment") {
      return res.status(403).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

export const updateCommentController = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const userId = req.id;

  try {
    const updated = await updateComment(commentId, userId, text);
    res.status(201).json({
        success:true,message:"Comment Updated Successfully",
        updated});
  
  } catch (err) {
    if (err.message === "Comment not found") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "Not authorized to edit this comment") {
      return res.status(403).json({ message: err.message });
    }
    if (err.message === "Comment text is required") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};