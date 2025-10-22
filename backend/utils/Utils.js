import jwt from "jsonwebtoken";


 export const error =(res,message)=>{

    return res.status(400).json({
        success:false,
        message:message
    })


}

 export const success =(res,message,token)=>{
   if(token !== undefined && token !== null && token !== "")
    return res.status(200).cookie("token",token).json({
        success:true,
        message,
        token
    })
    else{

        return res.status(200).json({
            success:true,
            message,})
    }


}


export const gettoken = (userid) =>{
  const token = jwt.sign({_id:userid},process.env.JWT_SECRET)
  return token

}
