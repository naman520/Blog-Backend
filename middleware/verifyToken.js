const jwt = require('jsonwebtoken')
const userModel = require("../models/userModal.js")

const isAdmin=async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:" Unauthorized: No token"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SCERET)
        const user = await userModel.findById(decoded.userId)
        if(!user){
            return res.status(401).json({message:"USER NOT FOUND"})
        }

        if(user.role !== 'admin'){
            return res.status(403).json({message:"Unauthorized :: user not admin"})
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}

const Isuser = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message:" Unauthorized: No token"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SCERET)
        const user = await userModel.findById(decoded.userId)
        if(!user){
            return res.status(401).json({message:"USER NOT FOUND"})
        }


        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };

module.exports = {isAdmin, Isuser, authMiddleware}