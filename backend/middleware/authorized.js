const jwt = require("jsonwebtoken");
const { User } = require("../model/user_model.js");

const authenticate = async(req,res,next)=>{
    const token = req.cookies.jwt;
    // console.log("jwt middleware token ",token);
    if(!token){
        return res.status(401).json({message:"Unauthorized "})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user= await User.findById(decoded.userId)
    } catch (error) {
        res.status(401).json({message:"" + error.message})
    }
    next();
    
}


module.exports = {
    authenticate
}