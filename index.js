const express=require("express");
const {connection}=require("./db")
const {userrouter}=require("./routes/user.routes")
const {productroute}=require("./routes/products.route")
const {authenticate}=require("./middleware/authenticate")
require("dotenv").config()

const app=express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello to homepage")
})

app.use("/user",userrouter)

app.use(authenticate)

app.use("/products",productroute)


app.listen(process.env.port,async()=>{
    await connection
    console.log(`Server running at ${process.env.port}`)
})