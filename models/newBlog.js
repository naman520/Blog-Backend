const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    content:{
        type: String,
        required: true
    },
    
    type:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required: false
    }
},{timestamps:true})

const blogModel = mongoose.model('Blog',blogSchema)

module.exports = blogModel