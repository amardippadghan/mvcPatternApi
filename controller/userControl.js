require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const key = process.env.JWT_SECRET_KEY;
const saltRound = 10 ; 

const creatUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received user data:", { name, email, password });
      console.log("Salt rounds:", saltRound);
    const hashedPassword = await bcrypt.hash(password, saltRound);
    
    console.log("Hashed password:", hashedPassword);

    const token = jwt.sign({ name, email, password: hashedPassword }, key, {
      expiresIn: "3h",
    });
    console.log("Generated JWT token:", token);

    const user = await User.create({ name, email, password: hashedPassword });
    console.log("Created user:", user);

    res.status(201).json({ user: user, token: token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: error.message });
  }
};

const SendMail = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { email } = req.body;
    console.log("Recipient email:", email);

    const transporter = nodemailer.createTransport({
      host: "server.internsbee.com",
      port: 645,
      auth: {
        user: "internsbee@server.internsbee.com",
        pass: "7PKBVkYd",
      },
    });

    const msg = {
      from: '"the express app" <theexpressapp@example.com>',
      to: `vedant.0370@gmail.com`,
      subject: "sup",
      text: "Login time no see",
    };

    const info = await transporter.sendMail(msg);
    const token = jwt.sign({ email }, key, { expiresIn: "3h" });
    console.log("Generated JWT token:", token);

    console.log("Message sent: %s", info.messageId);

    res.json({
      status: "success",
      message: "Email sent successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateToken = async (req, res) => {
  try {
    const token = jwt.sign({ id: 1 }, key, { expiresIn: "3h" });
    res.send(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { creatUser, getUser, SendMail, generateToken , Login };
