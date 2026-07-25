import { findPhotoById } from "../repositories/photo_repository.js";
import { createPurchase, deletePurchase, findPurchase, findPurchaseById, findPurchasesByBuyer, findPurchasesByPhotographer } from "../repositories/transaction_repository.js";

export const buyPhoto=async(buyerId,photo)=>{
   const existing= await findPurchase(buyerId,photo)
   if(existing)throw new Error('Request already Exists')// buyerId coming from middleware
   else {
const photoDetails=findPhotoById(photo)
         if (!photoDetails) {
    throw new Error("Photo doesn't exist");
}
 if (photoDetails.photographer.toString() === buyerId.toString()) {
        throw new Error("You cannot buy your own photo.")
    }
        const newTransaction= await createPurchase({
    buyer: buyerId,
    photographer: photoDetails.photographer,
    photo: photo,
    amount: photoDetails.price
})  
  return newTransaction}

}

export const getPurchaseById=async(id)=>{
    return await findPurchaseById(id)
}

export const getPurchaseHistory=async(userId)=>{
    return await findPurchasesByBuyer(userId)
}//buyer ne kharidi

export const getSalesHistory=async(photographerId)=>{
    return await findPurchasesByPhotographer(photographerId)
}//photographer ne bechi

export const getPhotoPurchases=async(photo)=>{return await  findPurchasesByPhoto(photo) }//photo ki transaction

export const cancelPurchase=async (id)=>{
   const existing= await findPurchaseById(id)
   if(!existing)throw new Error ("Purchase id doesn't exists")
    else 
    return await deletePurchase(id)
}