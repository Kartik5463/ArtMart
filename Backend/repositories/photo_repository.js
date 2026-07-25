import Photo from "../models/Photo.js"
import User from "../models/User.js"

export const createPhoto=async(photoData)=>{
    return await Photo.create(photoData)
}
export const findPhotoById=async(id)=>{
    return await Photo.findById(id)
}
export const findPhotosByPhotographer = async(id)=>{
    return await Photo.find({ photographer: id });
}
export const findPhotosForSale=async()=>{
    return await Photo.find({isForSale:true})
}
export const updatePhoto=async(id,updatedPhotoData)=>{
    return await Photo.findByIdAndUpdate(id,updatedPhotoData,{new:true})
}
export const updateSaleStatus=async(id)=>{
    return await Photo.findByIdAndUpdate(id,{isForSale:false},{new:true})
}
export const deletePhoto=async(id)=>{
    return await Photo.findByIdAndDelete(id);
}
export const findPhotosByTag = async(tag)=>{
    return await Photo.find({
        tags: tag
    });
}
export const findAllPhotos = async () => {
    return await Photo.find().populate("photographer", "name email");
};
