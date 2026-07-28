import User from "../models/User.js"

export const createUser=async(userData)=>{
    return await User.create(userData)
}
export const findUserById=async(id)=>{
    return await User.findById(id).select('-password')
}
export const findUserByEmail=async(email)=>{
    return await User.findOne({email}).select('-password')
}
export const updateUser=async(id, updateData)=>{
    return await User.findByIdAndUpdate(id,updateData,{new:true}).select('-password')
}
export const deleteUser=async(id)=>{
    return await User.findByIdAndDelete(id)
}
export const findPhotographers=async()=>{
    return await User.find({isPhotographer:true}).select('-password')
}
export const findUserByName=async(name)=>{
    return await User.find({name:name}).select('-password')
}
export const findUserByIdWithPassword=async(id)=>{
    return await User.findById(id)
}
export const findPurchasedPhotos = async (id) => {
  return await User.findById(id).populate({
    path: "purchasedImages",
    populate: {
      path: "photographer",
      select: "name", // only fetch the photographer's name
    },
  });
};
export const addPurchasedImage = async (userId, photoId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        purchasedImages: photoId,
      },
    },
    {
      new: true,
    }
  );
};