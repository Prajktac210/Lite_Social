import express from "express"
import {config} from "dotenv"
config();




 const PORT= 3000 || process.env.PORT
 const app=express();

 //utils its set like a responder
 import responder from "./utils/responder.js";

 //config
 import connectdb from "./config/connectdb.js";

app.get ("/health",(req,res)=>{
    return  responder (res,null,200,true,"server is healthy")
})
app.listen(PORT, () => {
    console.log(`App is started on localhost ${PORT}`);
    connectdb()
});
