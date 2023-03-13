function authorise(permittedroles){
    return (req,res,next)=>{
        if(permittedroles.includes(req.role)){
            next();
        }
        else{
            res.send("You are not authorized")
        }
    }
}

module.exports={
    authorise
}