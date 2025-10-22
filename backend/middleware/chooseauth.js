import { error } from "../utils/Utils.js";
import jwt from "jsonwebtoken";
import adminauth from './adminauth.js';
import userauth from './userauth.js';


async function chooseAuth(req, res, next) {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return error(res, "Login first");
        }

        // Verify the token to get user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return error(res, "Invalid token");
        }
        if(decoded.email){

            
            // Check if the user is an admin based on their role or email
            if ( decoded.email === process.env.ADMIN_EMAIL) {
                
                return adminauth(req,res,next) ;
            }
        } else {
return userauth(req,res,next)

        }
    } catch (err) {
        return error(res, err.message);
    }
}

  export default chooseAuth