import { findUserById } from "../repositories/user_repository.js";
import{addComment,findCommentById,getCommentsForPhoto,deleteCommentById, updateCommentById}from"../repositories/comment_repository.js"
export const addNewComment = async (photoId, userId, text) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!text || !text.trim()) {
    throw new Error("Comment text is required");
  }

  return await addComment(photoId, userId, text);
};


export const fetchCommentsForPhoto = async (photoId) => {
  return await getCommentsForPhoto(photoId);
};

export const deleteComment = async (commentId, userId) => {
  const comment = await findCommentById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }


  if (comment.user.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete this comment");
  }

  return await deleteCommentById(commentId);
};

export const updateComment = async (commentId, userId, text) => {
  const comment = await findCommentById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (comment.user.toString() !== userId.toString()) {
    throw new Error("Not authorized to edit this comment");
  }
  if (!text || !text.trim()) {
    throw new Error("Comment text is required");
  }

  return await updateCommentById(commentId, userId, text);
};