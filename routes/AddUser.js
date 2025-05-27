const express =require("express");
const { Addusers, getUsers ,deleteUser} = require("../controller/AddUser")
const router = express.Router();


router.post("/adduser" , Addusers)
router.get('/users', getUsers);
router.delete('/', deleteUser )


module.exports = router;