

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // use axios for HTTP request
require('dotenv').config();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key_here'; // Replace with .env in production

// ======= SIGNUP =======
const Signup = async (req, res) => {
  try {
    const { name, email, password, captchaToken } = req.body;

    if (!captchaToken) {
      return res.status(400).json({ message: 'Captcha token is missing' });
    }

    //  Verify captcha with Google
    const secretKey ="6LfSi0srAAAAAH40JSIBNNz9YiTXH9MbJhnPQaE9"; // Get this from Google reCAPTCHA admin console
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    const captchaResponse = await axios.post(verifyUrl);

    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //  Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
    console.log(error);
  }
};


// ======= LOGIN =======

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
       
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  Signup,
  login
}
