const express = require("express");
const {ProductModel}=require("../models/products.model")
const {authorise}=require("../middleware/authorisation")

const productroute=express.Router();

productroute.get("/",async(req,res)=>{

    let products=await ProductModel.find()
    res.send(products)
})

productroute.post("/addproducts",authorise(["seller"]),async(req,res)=>{
    let {name,description}=req.body;

    await ProductModel.insertMany([{name,description}])
    res.send("products added")
})

productroute.get("/deleteproducts",authorise(["seller"]),async(req,res)=>{
    let {id}=req.query;

    await ProductModel.findByIdAndDelete({_id:id})
    res.send("product deleted")
})



module.exports={
    productroute
}