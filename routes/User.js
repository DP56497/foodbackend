const express = require("express");
const {Signup , login} = require("../controller/User");


const router = express.Router();

router.post("/signup" , Signup);
router.get("/login" , login);


module.exports = router;