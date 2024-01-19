require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const nodemailer = require("nodemailer");

const key = process.env.JWT_SECRET_KEY;



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

const SendMail = async (req, res) => { 
   try {
     console.log("Request body:", req.body);
     const { email } = req.body;
     console.log("Recipient email:", email);

     const transporter = nodemailer.createTransport({
       host: "smtp.ethereal.email",
       port: 587,
       auth: {
         user: "allene.goyette@ethereal.email",
         pass: "xNPJDm61NYRDSYAw6c",
       },
     });

     const msg = {
       from: '"the express app" <theexpressapp@example.com>',
       to: `${email}`,
       subject: "sup",
       text: "Login time no see",
     };

     const info = await transporter.sendMail(msg);
     const token = jwt.sign({ email }, key, { expiresIn: "3h" });
     console.log("Generated JWT token:", token);

     console.log("Message sent: %s", info.messageId);

     res.json({ status: "success", message: "Email sent successfully",
     token : token
    
    });
   } catch (error) {
     console.error("Error sending email:", error);
     res
       .status(500)
       .json({ status: "error", message: "Internal server error" });
   }

}


const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { creatUser , getUser , SendMail};
