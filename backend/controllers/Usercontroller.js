import User from "../models/Usermodels.js"
import { error, gettoken, success } from "../utils/Utils.js"
import bcryptjs from "bcryptjs"


const register = async (req, res) => {
    const { name, email, password } = req.body.data
    if (!name || !email || !password) {
        return error( res, "All fields are required")
    }

    try {
        const user = await User.findOne({ email })
        if (user) {
            return error( res, "User already exists")
        }

        const hashpassword = await bcryptjs.hash(password, 10)
        const newuser = await User.create({
            name,
            email,
            password: hashpassword,
        })

        const token = gettoken(newuser._id)
        res.cookie("token",token,{

            httpOnly: true,
            secure: true,
            sameSite: 'none'
            
        })
        return success( res, "Registered successfully", token)
    } catch (e) {
        return error( res, "Something went wrong")
    }
}

const login = async (req, res) => {


    const{email,password}=req.body.data
    if(!email || !password){
        return error(res,"Pls provide all credentials")
    }
    try {


        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
const token = gettoken(email)
            return success(res,"admin",token)
        }
        const user = await User.findOne({email})

        if(!user){
            return error(res,"Invalid Credentials")
        }

        const verifypass = await bcryptjs.compare(password,user.password)
        if(!verifypass){
            return error(res,"Incorrect password")

        }

        const token = gettoken(user._id)
        res.cookie("token",token,{

            httpOnly: true,
            secure: true,
            sameSite: 'none'
            
        })

        return success(res,"user",token)
    } catch (e) {

        return error(res,e.message)
        
    }
}

const logout = async (req, res) => {
    return res.clearCookie("token").status(200).json({ success: true, message: "Logged out" })
}

export { register, login, logout }