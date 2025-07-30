import responder from "../utils/responder.js"; // Add .js for ES modules
import bcrypt from "bcrypt";
import User from "../modules/user.model.js"; 

export const signup = async (req, res) => {
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
