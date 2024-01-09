const jwt = require("jsonwebtoken");
const User = require("../models/users");

const key = "secret";

const creatUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received user data:", { name, email, password });

    const token = jwt.sign({ name, email, password }, key, { expiresIn: "3h" });
    console.log("Generated JWT token:", token);

    const user = await User.create({ name, email, password });
    console.log("Created user:", user);

    res.status(201).json({ user: user, token: token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
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

module.exports = { creatUser , getUser };
