import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    photographer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },

    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;