const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },

    role:{
        type:String,
        enum:['admin',"user"],
        default:"user"
    },
    saved:{
        type:mongoose.Types.ObjectId
    }
},{timestamps:true})

const userModel = mongoose.model('Users',userSchema)

module.exports = userModel