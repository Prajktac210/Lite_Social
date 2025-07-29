import mongoose from "mongoose"
import responder from "../utils/responder.js"

const  connectdb= async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL)//MONGO_URL IN THIS SAVE URL OF DB
    console.log("db connected")
    }catch(error){
return responder(null,500,false,error.message)
    }

}
export default connectdb