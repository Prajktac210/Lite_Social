import responder from "../utils/responder.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 

 const signup = async (req, res) => {
  try {
    const { name, email, password, user_name } = req.body;
    const requiredFields = ["name", "email", "password", "user_name"];

    // ✅ Validate required fields
    requiredFields.forEach((field) => {
  if (!req.body[field] ) {
    return responder(res, null, 400, false, `${field} is required`);
      
  }
});

       

    // ✅ Check for existing email
    const alreadyExitEmail = await User.findOne({ email });
    if (alreadyExitEmail) {
      return responder(res, null, 400, false, "User already exists with this email");
    }

    // ✅ Check for existing username
    const exitUserName = await User.findOne({ user_name });
    if (exitUserName) {
      return responder(res, null, 400, false, "User already exists with this username");
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      user_name,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return responder(res, null, 400, false, "Something went wrong");
    }

    return responder(res, null, 200, true, "Account created successfully");
  } catch (error) {
    return responder(res, null, 500, false, `Signup error: ${error.message}`);
  }
};
const login =async (req,res)=>{
try {
  let {email,password}=req.body
  let requiredFields = ["email", "password"];

    // ✅ Validate required fields
    requiredFields.forEach((field) => {
  if (!req.body[field] ) {
    return responder(res, null, 400, false, `${field} is required`);
      
  }
});
let Founduser=await User.findOne({email})

if(!Founduser){
  return responder(res,null,400,false,"User not found")
}
let isPasswordCorrect=await bcrypt.compare(password,Founduser.password)
if(!isPasswordCorrect){
  return responder(res,null,400,false,"Invalid credentials")
}
let token = jwt.sign(
  {
    _id: Founduser._id,
    email: Founduser.email,
    user_name: Founduser.user_name,
  },
  process.env.JWT_SECRET, //  secret
  );

req.session.token=token //store token in the using session
return responder(res,null,200,true,"Login successful")
} catch (error) {
  return responder(res, null, 500, false, `Login error: ${error.message}`);
}


}
export {signup ,login}