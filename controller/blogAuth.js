const userModel = require('../models/userModal.js')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const blogModel = require('../models/newBlog.js')

const register = async(req, res) => {
    try {
      const{name, username, email,password} =  req.body
      console.log(req.body);

      const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      const hashpass = await bcryptjs.hashSync(password,10) 
      const newUser = new userModel({
        name,
        username,
        email,
        password:hashpass
      });
      await newUser.save();
      res.status(200).json(newUser)
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const login= async(req,res) =>{
  try {
    const {email, password} = req.body
    console.log(req.body)

    const user = await userModel.findOne({email})
    if(!user){
      res.status(404).json({success:false,message:"Invalid Credentials"})
    }

    const isPassvalid = await bcryptjs.compare(password,user.password)
    if(!isPassvalid){
      res.status(404).json({success:false,message:"Invalid Credentials"})
    }

    const token= jwt.sign({userId:user._id},process.env.JWT_SECRET)

    res.cookie('token',token,{
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
        sameSite: 'Lax'})
    res.status(200).json({success:true,message:"Login successfully",user,token})

  } catch (error) {
    console.log(error)
  }
}

const logout = async(req,res)=>{
  try{
    res.clearCookie('token')
    res.status(200).json({message:"user logout successfull"})
  }catch(error){
    res.status(500).json({message:"Internal error occured"})
    console.log(error)
  }
} 

const getUsername = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (user) {
      res.status(200).json({ username: user.username });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const profile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userBlogs = await blogModel.find({ username: user.username });
    
    if (userBlogs.length === 0) {
      return res.status(200).json({ message: 'User has no blogs', blogs: [] });
    }

    res.status(200).json(userBlogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUsername,
  profile
};