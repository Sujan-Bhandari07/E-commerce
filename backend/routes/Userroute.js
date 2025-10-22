import express from "express"
import { login, logout, register } from "../controllers/Usercontroller.js"



const Userrouter = express.Router()


Userrouter.post("/register",register)
Userrouter.post("/login",login)
Userrouter.post("/logout",logout)


export default Userrouter