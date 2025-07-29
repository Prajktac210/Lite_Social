
const responder =(res,data=null,status=200,sucess=true,message="i'm a default message")=>{
    return res.status(status).json({
        data,
        status,
        sucess,
        message,
        
    })
}
export default responder;