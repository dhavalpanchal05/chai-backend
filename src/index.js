
//require('dotenv').config({path:'./env'})

import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path:'./env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,() => {
        console.log(`Runnih at ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("MONGODB connection error!!:",error);
})
/*
;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("Error:",error)
        throw error
    }
})()
    */
   