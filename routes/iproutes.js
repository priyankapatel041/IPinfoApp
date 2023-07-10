const express=require("express")
const axios = require("axios")
const client=require("../redis")
const iprouter= express.Router()
const IpModel=require("../model/ipmodel")
const {auth} = require("../middleware/auth")


iprouter.get("/info", auth, async(req, res)=>{
    const ips= req.query.ip
    const data= await client.get(ips)
    if(data)
    {
        return res.status(200).send(data)
    }
    else{
        const result = await axios.get(`https://ipapi.co/${ips}/json/`)
        const data= result.data
        client.set(ips, JSON.stringify(data),"EX",60*60*6)

        await IpModel.findByIdAndUpdate({userID: req.userID},{
            userID:req.userID,
             $push:{visitedIP:ip}
        },
        {new:true, upsert:true})
        res.status(200).send(data)
    }
})


iprouter.get("/",(req,res)=>{
    res.send("h2")
})



module.exports= {iprouter}