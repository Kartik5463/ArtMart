import Comment from "../models/Comment.js";


export const findCommentById=async(id)=>{
    return await Comment.findById(id)
}
export const addComment = async (photoId, userId, text) => {
  const comment = await Comment.create({
    photo: photoId,
    user: userId,
    text,
  });

  return await comment.populate("user", "name profileImg");
};

export const getCommentsForPhoto = async (photoId) => {
  return await Comment.find({ photo: photoId })
    .populate("user", "name profileImg")
    .sort({ createdAt: -1 });
};

export const deleteCommentById = async (commentId) => {
 return  await Comment.findByIdAndDelete(commentId);
 
};

export const updateCommentById = async (commentId, userId, text) => {
 return  await Comment.findByIdAndUpdate(commentId,{text:text},{new:true}).populate("user", "name profileImg");

};