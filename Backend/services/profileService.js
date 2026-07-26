import { findUserByEmail, findUserById, findUserByIdWithPassword, updateUser } from "../repositories/user_repository.js"
import bcrypt from "bcrypt";
export const getUserProfile=async(userId)=>{
    const user=await findUserById(userId)
    if(!user){
        throw new Error("User is not registered")
    }
    return user
}
export const updateUserProfile=async(userId,updates)=>{
     const allowedUpdates = {}

    if(updates.name) allowedUpdates.name = updates.name
    const updatedUser = await updateUser(userId, allowedUpdates)
    if(!updatedUser){
        throw new Error("user not found");
    }
    return updatedUser
}
export const changeUserPassword=async(email,oldPassword,newPassword)=>{
    if (oldPassword === newPassword) {
    throw new Error("New password must be different from the old password");
    }
    const user_e=await findUserByEmail(email)

    const user=await findUserByIdWithPassword(user_e._id);
    if(!user_e){
        throw new Error("user not found")
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password)

    if(!isMatch){
        throw new Error("Old password incorrect")
    }
    const hashedPassword = await bcrypt.hash(newPassword,10)

    const updatedUser = await updateUser(user_e._id, {password: hashedPassword})

    return updatedUser;
}