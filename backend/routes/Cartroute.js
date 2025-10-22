
import express from "express"
import { addtocart, getall, getcart, managecart } from "../controllers/Cartcontroller.js"
import userauth from "../middleware/userauth.js"
import chooseAuth from "../middleware/chooseauth.js"
import adminauth from "../middleware/adminauth.js"

const cartrouter = express.Router()

cartrouter.post("/addcart",chooseAuth,addtocart)
cartrouter.get("/getcart",userauth,getcart)
cartrouter.get("/getallcart",adminauth,getall)
cartrouter.put("/managecart",adminauth,managecart)


export default cartrouter