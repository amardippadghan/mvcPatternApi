const express = require("express");

const router = express.Router();
const VerifyToken = require("../middleware/Tokenauth");

const userControl = require("../controller/userControl");

router.post("/register", VerifyToken, userControl.creatUser);
router.get("/users", VerifyToken, userControl.getUser);
router.post("/sendmail", VerifyToken, userControl.SendMail);
router.get("/token", userControl.generateToken);
router.post("/login", userControl.Login);

module.exports = router;
