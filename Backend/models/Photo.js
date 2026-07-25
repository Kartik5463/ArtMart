import mongoose from "mongoose"
const photoSchema = new mongoose.Schema({
  title: String,

  description: String,

  imageUrl: String,

  price: {
    type: Number,
    default: 0,
    min:0
  },

  photographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  isForSale: {
    type: Boolean,
    default: true
  },

  tags: [String]//used for searching data
}, { timestamps: true });
const Photo=mongoose.model("Photo",photoSchema)
export default Photo