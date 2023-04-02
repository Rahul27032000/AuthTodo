const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const { access_token, refresh_token } = require("../config/config");

// register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password))
      return res.status(409).json({ message: "You should give enough data" });

    // Check if user with this username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername)
      return res.status(409).json({ message: "Username already in use" });

    // Check if user with this email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail)
      return res.status(409).json({ message: "Email already in use" });

    // Hash password and create new user document
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// register a new user
const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with this username exists
    let user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User does not exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const accessToken = generateAccessToken(user.toJSON());

    const isTokenExist = await RefreshToken.findOne({ user: user._id });
    if (!isTokenExist) {
      const refreshToken = jwt.sign(user.toJSON(), refresh_token);
      await RefreshToken.create({ token: refreshToken, user: user._id });
      return res.status(200).json({
        message: "Login successful",
        data: { accessToken, refreshToken },
      });
    }
    const refreshToken = isTokenExist.token;
    res.status(200).json({
      message: "Login successful",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(user, access_token, { expiresIn: "2h" });
};

module.exports = {
  register,
  login,
};
