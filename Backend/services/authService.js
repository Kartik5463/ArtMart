import { createUser, findUserByEmail, findUserByIdWithPassword } from "../repositories/user_repository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const signupUser = async({name, email ,password,isPhotographer})=>{

    const existingUser = await findUserByEmail(email)

    if(existingUser){
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await createUser({name, email, password: hashedPassword,isPhotographer})

    return {userId: newUser._id, name:newUser.name, email: newUser.email,isPhotographer:newUser.isPhotographer}

}  


export const loginUser = async({email, password}) =>{

    const existed=await findUserByEmail(email)
    if(!existed){
        throw new Error("Invalid email or password")
    }
    const user = await findUserByIdWithPassword(existed._id)
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("Invalid email or password")
    }

    const token = await jwt.sign({userId: user._id},process.env.JWT_SECRET, {expiresIn: '24h'})

    return {token, user:{
        userId: user._id,
        userEmail: user.email,
        userName: user.name,
        isPhotographer:user.isPhotographer
    } }
}
