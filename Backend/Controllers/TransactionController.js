import { buyPhoto, getPurchaseById, getPurchaseHistory, getSalesHistory, getPhotoPurchases, cancelPurchase } from "../services/transactionService.js";

export const buyPhotographController = async (req, res) => {
    try {
        const buyerId = req.id
        const { photoId } = req.body
        const transaction = await buyPhoto(
            photoId,
            buyerId
        );
        res.status(201).json({
            success: true,
            message: "Transaction created successfully", transaction
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

export const getPurchaseByIdController = async (req, res) => {//for transaction history 
    try {
        const { id } = req.params;

        const purchase = await getPurchaseById(id);

        res.status(200).json({
            success: true,
            purchase
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const getPurchaseHistoryController = async (req, res) => {
    try {
        const purchases = await getPurchaseHistory(req.id);

        res.status(200).json({
            success: true,
            purchases
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
export const getSalesHistoryController = async (req, res) => {
        try {
            const sales = await getSalesHistory(req.id);

            res.status(200).json({
                success: true,
                sales
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
}

    export const getPhotoPurchasesController = async (req, res) => {
        try {
            const { photoId } = req.params;

            const purchases = await getPhotoPurchases(photoId);

            res.status(200).json({
                success: true,
                purchases
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };

    export const cancelPurchaseController = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedPurchase = await cancelPurchase(id);

            res.status(200).json({
                success: true,
                deletedPurchase
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };