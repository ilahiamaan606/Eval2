const express = require("express");
const { UserModel } = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs=require("fs")
const path=require("path")


const userrouter = express.Router()


userrouter.post("/signup", async (req, res) => {
    let { email, password, role } = req.body;

    let userexist = await UserModel.findOne({ email });

    if (userexist) {
        res.send("Email already registered")
    }
    else {
        bcrypt.hash(password, 2, async function (err, hash) {
            if (err) {
                res.send(err)
            }
            else {
                await UserModel.insertMany([{ email, password: hash, role }]);
                res.send("Registerd successfully")
            }
        });
    }
})

userrouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;

    let userexist=await UserModel.findOne({ email });

    if(userexist){
        bcrypt.compare(password, userexist.password, function(err, result) {
            if(result){
                var normaltoken = jwt.sign({ user_role: userexist.role }, 'normaltoken',{expiresIn:60});
                var refreshtoken = jwt.sign({ user_role: userexist.role }, 'refreshtoken',{expiresIn:300});
                res.send({normaltoken,refreshtoken})
            }
            else{
                res.send("Wrong Credentials")
            }
        });
    }
    else{
        res.send("User doesn't exist")
    }

})

userrouter.post("/refreshtoken",(req,res)=>{
    let refreshtoken=req.headers.refreshtoken.split(" ")[1];

    if(refreshtoken){
        jwt.verify(refreshtoken, 'refreshtoken', function(err, decoded) {
            if(err){
                res.send(err.message)
            }
            else if(decoded){
                var normaltoken = jwt.sign({ user_role: decoded.user_role }, 'normaltoken',{expiresIn:60});
                res.send({normaltoken})
            }
          });
    }
    else{
        res.send("Login Again")
    }
})

userrouter.get("/logout",(req,res)=>{
    let token=req.headers.authentication?.split(" ")[1];

    let blacklist=JSON.parse(fs.readFileSync(path.resolve(__dirname,"../blacklist.json"),"utf-8"));
    blacklist.push(token);
    fs.writeFileSync(path.resolve(__dirname,"../blacklist.json"),JSON.stringify(blacklist))

    res.send("Logout Successfull")

})



module.exports = {
    userrouter
}