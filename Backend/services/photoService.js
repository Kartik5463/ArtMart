import { createPhoto, deletePhoto, findAllPhotos, findPhotoById, findPhotosByPhotographer, findPhotosByTag, findPhotosForSale, updatePhoto, updateSaleStatus } from "../repositories/photo_repository.js"
import { findUserById } from "../repositories/user_repository.js"

export const uploadPhoto=async(photographer_id,photoData)=>{
    const photographer=await findUserById(photographer_id)
    if(!photographer||!(photographer.isPhotographer)){
        throw new Error("photographer is not existed or user is not a photographer")
    }
    return await createPhoto({
    ...photoData,
    photographer: photographer_id
    });
}
export const getPhotobyId=async(id)=>{
    const photo=await findPhotoById(id);
    if(!photo){
        throw new Error("Photo does not exist")
    }
    return photo;
}
export const getPhotos= async () => {
    const photos = await findAllPhotos();

    return photos;
};
export const getPhotographerPortfolio=async(photographer_id)=>{
    const photographer=await findUserById(photographer_id)
    if(!photographer||!(photographer.isPhotographer)){
        throw new Error("photographer is not existed or user is not a photographer")
    }
    return await findPhotosByPhotographer(photographer_id)
}
export const editPhotobyId=async(id,updatedPhotoData)=>{
    const photo=await findPhotoById(id);
    if(!photo){
        throw new Error("Photo not existed")
    }
    return await updatePhoto(id,updatedPhotoData);
}
export const removePhotobyId=async(id)=>{
    const photo=await findPhotoById(id);
    if(!photo){
        throw new Error("Photo not existed")
    }
    return await deletePhoto(id);
}
export const getPhotosForSale=async()=>{
    return await findPhotosForSale();
}
export const changeSaleStatus=async(id)=>{
    const photo = await findPhotoById(id);
    if (!photo) {
    throw new Error("Photo does not exist");
    }
    return await updateSaleStatus(id)
}
export const searchPhotos=async(tag)=>{
    return await findPhotosByTag(tag);
}
export const enhancePhoto=async()=>{

}