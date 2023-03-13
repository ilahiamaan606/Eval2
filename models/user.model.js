const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["user","seller"]
    }
})

const UserModel=mongoose.model("user",userSchema);

module.exports={
    UserModel
}