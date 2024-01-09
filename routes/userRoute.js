const express = require("express");

const router = express.Router();
const VerifyToken = require("../middleware/Tokenauth");

const userControl = require("../controller/userControl");


router.post("/register", VerifyToken, userControl.creatUser);
router.get("/users", VerifyToken, userControl.getUser);

module.exports = router;