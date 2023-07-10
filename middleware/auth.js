const jwt= require("jsonwebtoken")
const {userModel}=require("../model/usermodel")
const client=require("../redis")


const auth= async(req,res, next)=>{
    const token= req.headers.authourization
  
      
        if(token){
            const isTokenBlacklisted= await client.get("token")
            if(isTokenBlacklisted)
            {
                return res.status(200).send({"msg":"plss login agian..."})
            }
            const decoded= jwt.verify(token, "masai")
            if(decoded)
            {
                req.body.userID= decoded.userID
                req.userID=decoded.userID
                next()
            }
            else{
                return res.status(400).send({"msg":"Invalid Credentials"})
            }
        }
  
}


module.exports={auth}