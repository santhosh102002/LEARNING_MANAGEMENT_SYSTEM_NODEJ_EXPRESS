const User = require("../models/user.models");
const { default: AppError } = require("../utils/appError");



const register = async (req,res)=>{
 const {fullname,email,password} = req.body;
 if(!fullname || !email || !password){
    return next(new AppError("All fields are required",400))
 }
 const UserExists = await User.findOne({email})
 if(UserExists){
    return next(new AppError("User Already exists ",400))
}
const user = await User.create({
    fullname,
    email,
    password
}
)

if(!user){
    return next(new AppError("Registering user if failed, Try again",400))
}
await user.save();

user.password = undefined
res.status(200).json({
    success: true,
    message: "User registered successfully",
    user
})
};

const login  = async (req,res)=>{
const {email,password} = req.body;
if(!email || !password){
    return next(new AppError("All fields are required",400))
}
const userexist = await User.findOne({email}).select('+password') 
if(!userexist || !userexist.comparePassword(password)){
    return next(new AppError("Enter valid email and password",400))
}

}

const logout = ()=>{

}
const getProfile = ()=>{

}

module.exports = {
    register,login,logout,getProfile
}