const mongoose= require("mongoose")



const blacklistSchema= mongoose.Schema({
    accesstoken:String,
    refreshtoken: String
},{versionKey:false})



const blacklistedModel= mongoose.model("black", blacklistSchema)


module.exports={blacklistedModel}