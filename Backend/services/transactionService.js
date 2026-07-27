import { findPhotoById, updateSaleStatus } from "../repositories/photo_repository.js";
import { createPurchase, deletePurchase, findPurchase, findPurchaseById, findPurchasesByBuyer, findPurchasesByPhotographer } from "../repositories/transaction_repository.js";
import { addPurchasedImage } from "../repositories/user_repository.js";

export const buyPhoto = async (photoId, buyerId) => {
  const photo = await findPhotoById(photoId);
  console.log(photo,photoId)
  if (!photo) {
    throw new Error("Photo not found");
  }
  if (!photo.isForSale) {
    throw new Error("Photo is not available for sale");
  }
  if (photo.photographer.toString() === buyerId.toString()) {
    throw new Error("You cannot buy your own photo");
  }
  const transaction = await createPurchase({
    buyer: buyerId,
    photographer: photo.photographer,
    photo: photoId,
    amount: photo.price,
  });
  await addPurchasedImage(buyerId, photoId);
  await updateSaleStatus(photoId);
  return transaction;
};

export const getPurchaseById = async (id) => {
    return await findPurchaseById(id)
}

export const getPurchaseHistory = async (userId) => {
    return await findPurchasesByBuyer(userId)
}//buyer ne kharidi

export const getSalesHistory = async (photographerId) => {
    return await findPurchasesByPhotographer(photographerId)
}//photographer ne bechi

export const getPhotoPurchases = async (photo) => { return await findPurchasesByPhoto(photo) }//photo ki transaction

export const cancelPurchase = async (id) => {
    const existing = await findPurchaseById(id)
    if (!existing) throw new Error("Purchase id doesn't exists")
    else
        return await deletePurchase(id)
}