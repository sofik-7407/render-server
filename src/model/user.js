const mongoose=require('mongoose')
  
    Schema=mongoose.Schema
let userSchema=new Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    }
})

module.exports = mongoose.model('user', userSchema);
