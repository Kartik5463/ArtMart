import Transaction from "../Models/Transaction.js";

export const createPurchase = async (transactionDetails) => {
    return await Transaction.create(transactionDetails);
};

export const findPurchaseById = async (id) => {
    return await Transaction.findById(id);
};

export const findPurchasesByBuyer = async (buyer) => {
    return await Transaction.find({ buyer });
};

export const findPurchasesByPhoto = async (photo) => {
    return await Transaction.find({ photo });
};

// Find whether a buyer has already purchased a particular photo
export const findPurchase = async (buyer, photo) => {
    return await Transaction.findOne({
        buyer,
        photo
    });
};

export const deletePurchase = async (id) => {
    return await Transaction.findByIdAndDelete(id);
};


