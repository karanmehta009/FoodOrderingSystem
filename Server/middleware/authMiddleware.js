import jwt from "jsonwebtoken";
import user from "../models/user.js";

export const protect = async (req, res, next) =>{
    try {
        //it will read header and split it and get toaken 1pick token part
        const token = req.headers.authorization?.split(" ") [1];
        if (!token) {
            return res.status(401).json({message:"NO token, authorization denied"})
        }
        //verify token use secret key check token valid decode token in an object
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //fetch the user from db find user whose id in token remove password for safety  save user in req.user so next router use
        req.user = await  user.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({message:"Token invalid or expired",error: error.message});
        
    }
}