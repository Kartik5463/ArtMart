import { changeUserPassword, getUserProfile, updateUserProfile } from "../services/profileService.js"

export const getMe = async(req, res)=>{
    try {
        const user = await getUserProfile(req.id)
        res.status(200).json({
            success: true,
            message: 'profile fetched successfully',
            user
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }

}
export const updateProfile = async(req, res)=>{
    try {
        const updatedUser = await updateUserProfile(req.id, req.body)
        res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            updatedUser
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message
        })
    }
}
export const changePassword = async(req, res) =>{
    try {
        const {oldPassword, newPassword,email} = req.body
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                   success: false,
                   message: "Old password and new password are required"
            });
        }
        const updatedUser = await changeUserPassword(email, oldPassword, newPassword)

        res.status(200).json({
            success: true,
            message: "Password updated succesfully",
            updatedUser
        })
    } catch (err) {
        res.status(401).json({
            success: false,
            message:err.message
        })
    }
}