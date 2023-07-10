const express=require("express")
const userRouter=express.Router()
const {userModel}=require("../model/usermodel")
const jwt =require("jsonwebtoken")
const bcrypt= require("bcrypt")
const {client}= require("../redis")
const {auth}= require("../middleware/auth")
const {blacklistedModel}= require("../model/blacklist")



const app= express()




userRouter.post("/register", async(req, res)=>{
    const {email, pass}= req.body
    try {
        const check = await userModel.findOne({email})
        if(check)
        {
            return res.status(400).send({"msg":"user already exist"})
        }
        bcrypt.hash(pass, 5, async(req, res)=>{
            const user= new userModel({email, pass:hash})
            await user.save()
        })
    } catch (err) {
        res.status(400).send({"msg":"ERROR FOUND"})
    }
})




//**************************************************************************************************** */



userRouter.post("/login", async(req,res)=>{
    
    try {
        const {email, pass}= req.body
        const user= await userModel.findOne({email})
        if(user)
        {
            return res.status(400).send({"msg":"Invalid Credentials"})
        }
        const password= await bcrypt.compare(pass, user.pass)
        if(!password)
        {
            return res.status(400).send({"msg":"Invalid Credentials"})
        }

        const token= jwt.sign({userID: user._id},"masai",{
            expiresIn:'3m'
        })

        return res.status(200).send({"msg":"login successfully!!"})


    } catch (err) {
        res.status(400).send({"msg":"ERROR FOUND"})
    }

})




//******************************************************************************************** */



userRouter.post("/logout", auth,async(req,res)=>{
    try {
        const token = req.headers.authorization
        if(token){
            client.set("token", token, "EX", 60*60*6)
            res.status(200).send({"msg":"log out!!"})
        }
       
    } catch (err) {
        res.status(400).send({"msg":"ERROR FOUND"})
    }
})



//************************************************************************************************ */



userRouter.get("/getnewtoken", (req,res)=>{
    const refreshtoken= req.headers.authorization
    const decoded=jwt.verify(refreshtoken,"krunal")
    if(decoded)
    {
        const token= jwt.sign({userID: decoded.userID}, "masai",{
            expiresIn:'6h'
        })
    }
    else{
        res.status(200).send({"msg":"login again please..."})
    }
})





module.exports={userRouter}