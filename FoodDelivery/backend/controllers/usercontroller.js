import User from "../model/usermodel.js"; // Capitalized User
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import dotenv from "dotenv";
dotenv.config();
// Create JWT token
const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Login user
const loginUser = async (req, res) => {
  try {const { email, password } = req.body;
  const user =await User.findOne({email:email});
  
  if(!user){
    return res.json({ success: false, message: "Invalid email " });
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.json({ success: false, message: "Invalid  password" });
  }
  const token=createToken(user._id);
  res.json({ success: true, token });
}catch (error) {
  console.error("Login Error:", error);
  res.json({ success: false, message: `Error logging in: ${error.message}` });
}
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const exist = await User.findOne({ email }); // Use User
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password (minimum 8 characters)" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ // Use User
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Generate token
    const token = createToken(savedUser);

    // Return success response
    res.json({ success: true, token });
  } catch (error) {
    console.error("Registration Error:", error);
    res.json({ success: false, message: `Error registering user: ${error.message}` });
  }
};

export { loginUser, registerUser };