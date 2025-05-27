const {AddUserModel} = require("../models/AddUser"); 

const mongoose = require("mongoose");


const Addusers = async (req, res) => {
  try {
    const { username, email, role } = req.body;  //  use lowercase keys

    if (!username || !email || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    const existing = await AddUserModel.findOne({ email });  // model method
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered, please login",
      });
    }

    const user = await AddUserModel.create({ username, email, role });  // create user

    res.status(201).json({
      success: true,
      message: "Successfully registered",
      data: user,  //  return user data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = parseInt(req.query.limit) || 10; // default 10 per page
    const skip = (page - 1) * limit;

    const users = await AddUserModel.find().skip(skip).limit(limit);
    const totalUsers = await AddUserModel.countDocuments();

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};


// app.delete("/product/:id" , async(req ,res) => {
  
//   const result =await Product.deleteOne({_id:req.params.id})
//   res.send(result)
// })


// const deleteUser = async (req ,res) => {

//   const result = await AddUserModel.findByIdAndDelete({_id :req.params.id})
//   res.send(result)
// }



// const deleteUser = async (req, res) => {
  
//   try {
//     console.log("==== DELETE USER CALLED ====");
//     console.log("Full URL:", req.url);
//     console.log("req.params:", req.params);
//     console.log("Received ID:", req.params.id);

//     const userId ={ _id : req.params.id};

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       console.log("Not a valid MongoDB ObjectId:", userId);
//       return res.status(400).json({ success: false, message: "Invalid user ID" });
//     }

//     const user = await AddUserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     await AddUserModel.findByIdAndDelete(userId);

//     res.status(200).json({ success: true, message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error in deleteUser:", error);
//     res.status(500).json({ success: false, message: "Server error while deleting user" });
//   }
// };

const deleteUser = async(req ,res) => {
  try{
    const user = await AddUserModel.findById({_id : req.params.id});
    if(!user){
      return res.status(404).json({message : 'id not found'});
    }
     await user.deleteOne();
     res.json({message : "deleted"});
  }catch(error){
    console.log('Delete error :' , error);
    res.status(500).json({message : "Server error during delete ", error})
  }
}



module.exports = { Addusers, getUsers , deleteUser };



