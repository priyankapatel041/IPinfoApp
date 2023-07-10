const express = require("express")
const {connection}=require("./db")
const mongoose= require("mongoose")
require("dotenv").config()
const {userRouter}=require("./routes/userroute")
const {iprouter}=require("./routes/iproutes")
const {auth}=require("./middleware/auth")
const logger= require("./middleware/logger")

const app = express()
app.use(express.json())


app.use("/users", userRouter)
app.use(auth)

app.use("/ip", iprouter)



app.listen(process.env.port, async(req, res)=>{

        try {
            await connection
            console.log("CONNECTED")
        } catch (err) {
            console.log("************NOT CONNECTED************")
        }



})