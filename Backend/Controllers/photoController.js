import { changeSaleStatus, editPhotobyId, getPhotobyId, getPhotographerPortfolio, getPhotos, getPhotosForSale, removePhotobyId, searchPhotos, uploadPhoto } from "../services/photoService.js";

export const uploadnewPhoto = async (req, res) => {
    try {
        const photographerId = req.id;

        let imageUrl;

        // AI Generated Image
        if (req.body.isAI === "true") {
            if (!req.body.photo) {
                return res.status(400).json({
                    success: false,
                    message: "AI image not found.",
                });
            }

            imageUrl = "/uploads/" + req.body.photo;
        }

        // Normal Uploaded Image
        else {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Please upload an image",
                });
            }

            imageUrl = "/uploads/" + req.file.filename;
        }

        const photoData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl,
            price: Number(req.body.price),
            isForSale: req.body.isForSale === "true",
            tags: req.body.tag
                ? req.body.tag.split(",").map(tag => tag.trim())
                : [],
        };

        const newPhoto = await uploadPhoto(photographerId, photoData);

        res.status(201).json({
            success: true,
            data: newPhoto,
        });

    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
export const getPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await getPhotobyId(id);
        res.status(200).json({
            success: true,
            message: "fetched photo successfully",
            data: photo
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export const getAllRequiredPhotos = async (req, res) => {
    try {
        const photos = await getPhotos()
        res.status(200).json({
            success: true,
            message: "fetched photos successfully",
            data: photos
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export const removePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await removePhotobyId(id);
        res.status(200).json({
            success: true,
            message: "removed photo successfully",
            data: photo
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
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
export const sellingPhotos = async (req, res) => {
    try {
        const photos = await getPhotosForSale()
        res.status(200).json({
            success: true,
            message: "Photos ready for selling fetched successfully",
            data: photos
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export const updateSaleStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await changeSaleStatus(id)
        res.status(200).json({
            success: true,
            message: "status changed successfully",
            data: photo
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export const searchPhotosByTag = async (req, res) => {
    try {
        const { tag } = req.query;
        const photos = await searchPhotos(tag)
        res.status(200).json({
            success: true,
            message: "photos fetched successfully",
            data: photos
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
}
export const increaseLikeController = async (req, res) => {
  const { id } = req.params;
  const userId = req.id; 

  const photo = await  getPhotobyId(id);
  if (!photo) return res.status(404).json({ message: "Photo not found" });

  if (photo.likedBy.includes(userId)) {
    return res.status(400).json({ message: "Already liked" });
  }

  photo.likedBy.push(userId);
  photo.likes += 1;
  await photo.save();

  res.status(200).json(photo);
};
export const decreaseLikeController = async (req, res) => {
  const { id } = req.params;
  const userId = req.id;

  const photo = await  getPhotobyId(id);
  if (!photo) return res.status(404).json({ message: "Photo not found" });

  photo.likedBy = photo.likedBy.filter((uid) => uid.toString() !== userId.toString());
  photo.likes = Math.max(0, photo.likes - 1);
  await photo.save();

  res.status(200).json(photo);
};