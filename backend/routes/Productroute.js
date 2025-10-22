import express from "express"

import { getproduct, addproduct, deleteproduct } from "../controllers/Productcontroller.js"
import upload from "../middleware/Multer.js"
import adminauth from "../middleware/adminauth.js"
import chooseAuth from "../middleware/chooseauth.js"

const Productrouter = express.Router()

// The problem in the original code is that image1, image2, image3, image4 are not defined variables.
// They should be string field names for multer to use.
// Also, there is a typo in the getproduct route: "/getåproduct" should be "/getproduct".

Productrouter.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addproduct
)

// Test endpoint

Productrouter.get("/getproduct", getproduct)
Productrouter.delete("/deleteproduct", adminauth,deleteproduct)

export default Productrouter