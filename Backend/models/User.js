import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  isPhotographer: {
    type: Boolean,
    default: false
  },

  purchasedImages: {
  type: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo"
  }],
  default: []
  },
  profileImg:{
    type:String,
    required:true,
    default:"default.jpg"
  },


}, { timestamps: true });
const User=mongoose.model("User",userSchema)
export default User