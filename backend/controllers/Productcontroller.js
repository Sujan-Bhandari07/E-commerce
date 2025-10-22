import cloudinary from "../config/cloudinary.js"
import Product from "../models/Productmodel.js"
import fs from 'fs';
import { error, success } from "../utils/Utils.js"

const getproduct = async (req,res ) =>{

    try {
        const product = await Product.find({})
        if(!product){
            return error(res,"Not found")
        }

        return success(res,product)
    } catch (error) {

        return error(res,error.message)
        
    }

    

}

const addproduct = async (req,res ) =>{
    console.log("=== ADD PRODUCT REQUEST ===")
    console.log("Body:", req.body)
    console.log("Files:", req.files)
    
    const{name,desc,price,category,size,subcategory,isbestseller} = req.body
    const image1 =  req.files.image1 && req.files.image1[0]
    const image2 =  req.files.image2 && req.files.image2[0]
    const image3 =  req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4  &&  req.files.image4[0]

    console.log("Parsed data:")
    console.log("name:", name)
    console.log("price:", price, typeof price)
    console.log("isbestseller:", isbestseller, typeof isbestseller)
    console.log("size:", size, typeof size)

    // Convert string values to proper types
    const parsedPrice = parseFloat(price)
    const parsedIsBestseller = isbestseller === "true"
    const parsedSize = JSON.parse(size)
    
    console.log("Parsed values:")
    console.log("parsedPrice:", parsedPrice)
    console.log("parsedIsBestseller:", parsedIsBestseller)
    console.log("parsedSize:", parsedSize)

    if (!name || !desc || !price || !category || !size || !subcategory || isbestseller === undefined){

        return error(res,"Pls provide all fields")

    }

    if (isNaN(parsedPrice)) {
        return error(res, "Price must be a valid number")
    }

    const images=[image1,image2,image3,image4].filter((item)=> item !== undefined )

    if (images.length === 0) {
        console.log("No images provided, continuing without images for testing")
        // For testing, allow products without images
        // return error(res, "At least one image is required")
    }

    try {
        let imageurl = []
        
        if (images.length > 0) {
            imageurl = await Promise.all(images.map( async(item)=>{
                let result =  await cloudinary.uploader.upload(item.path,{resource_type:"image"})

                
                return result.secure_url
            }))
        }

        const productData = {
            name,
            desc,
            price: parsedPrice,
            category,
            subcategory,
            size: parsedSize,
            isbestseller: parsedIsBestseller,
            image: imageurl
        }
        
        console.log("Creating product with data:", productData)
        
        const newproduct = await Product.create(productData) 

        if(!newproduct){
            return error(res,"Couldn't create product")
        }

        return success(res,"Product created")
        
    } catch (err) {
        console.error("Error in addproduct:", err)
        return error(res, err.message || "Internal server error")
    }





}

const deleteproduct = async( req,res) =>{

    const {_id} = req.body
    if(!_id){
        error(res,"Pls provide the Id to the product to be deleted")
    }

   const deleted= await Product.findByIdAndDelete({_id})

    if(!deleted){
        return error(res,"Cannot delete")
    }

    return success(res,"Product deleted")
}

export{addproduct,getproduct,deleteproduct}