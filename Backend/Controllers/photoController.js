import { changeSaleStatus, editPhotobyId, getPhotobyId, getPhotographerPortfolio, getPhotos, getPhotosForSale, removePhotobyId, searchPhotos, uploadPhoto } from "../services/photoService.js";


export const uploadnewPhoto=async(req,res)=>{
    try{
        const photographerId = req.id;   // from JWT middleware
        const photoData = req.body;
        const new_photo=await uploadPhoto(photographerId,photoData)
        res.status(201).json({
            success: true,
            message:"uploaded photo successfully",
            data: new_photo
        });

    }
    catch(err){
        res.status(400).json({
            success: false,
            message:err.message,
        });
    }
}

export const getPhoto=async(req,res)=>{
    try{
        const { id } = req.params;
        const photo=await getPhotobyId(id);
        res.status(200).json({
            success: true,
            message:"fetched photo successfully",
            data:photo
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message:err.message
        });
    }
}
export const getAllRequiredPhotos=async(req,res)=>{
    try{
        const photos=await getPhotos()
        res.status(200).json({
            success: true,
            message:"fetched photos successfully",
            data:photos
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message:err.message
        });
    }
}
export const removePhoto=async(req,res)=>{
    try{
        const { id } = req.params;
        const photo=await removePhotobyId(id);
        res.status(200).json({
            success: true,
            message:"removed photo successfully",
            data:photo
        });
    }catch(err){
        res.status(400).json({
            success: false,
            message:err.message
        });
    }
}
export const editPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPhotoData = req.body;

        const photo = await editPhotobyId(id, updatedPhotoData);

        res.status(200).json({
            success: true,
            message: "Photo updated successfully",
            data: photo
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
export const getPortfolio = async (req, res) => {
    try {
        const photographerId = req.params.id;

        const photos = await getPhotographerPortfolio(photographerId);

        res.status(200).json({
            success: true,
            message: "Portfolio fetched successfully",
            data: photos
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};
export const sellingPhotos=async(req,res)=>{
    try{
        const photos=await getPhotosForSale()
        res.status(200).json({
            success: true,
            message: "Photos ready for selling fetched successfully",
            data: photos
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export const updateSaleStatus=async(req,res)=>{
    try{
        const { id } = req.params;
        const photo=await changeSaleStatus(id)
        res.status(200).json({
            success: true,
            message: "status changed successfully",
            data: photo
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export const searchPhotosByTag=async(req,res)=>{
    try{
        const { tag } = req.query;
        const photos=await searchPhotos(tag)
        res.status(200).json({
            success: true,
            message: "photos fetched successfully",
            data: photos
        });
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}