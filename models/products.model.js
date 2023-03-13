const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}