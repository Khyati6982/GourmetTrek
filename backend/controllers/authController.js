import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User registration
export const register = async (req, res) => {
  try {
    // Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: req.body.role
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully created" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create. Try again." });
  }
};

// User login
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If user exists, then check the password or compare the password
    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    // If password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const { password, role, ...rest } = user._doc;

    // Create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    // Set token in the browser cookies and send the response to the client
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        expires: token.expiresIn
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    res
      .status(500).json({ success: false, message: "Failed to Login" });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if new password is the same as the current password 
    const isSamePassword = await bcrypt.compare(newPassword, user.password); 
    if (isSamePassword) { 
      return res.status(400).json({ message: 'New password cannot be the same as the current password' }); 
    }
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password', error });
  }
};
