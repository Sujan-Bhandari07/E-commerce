import { error } from "../utils/Utils.js";
import jwt from "jsonwebtoken";

const adminauth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return error(res, "Login first");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return error(res, "invalid token");
    }

    req.admin = decoded;

    next();
  } catch (error) {
    return error(res, error.message);
  }
};

export default adminauth;
