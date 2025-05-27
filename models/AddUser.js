const mongoose = require("mongoose");

const AdduserSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type :String, enum : 
       [ 'Admin',
        'Staff']
    },
    // userId :{
    //     type:String,
    // }
} , { timestamps: true })

const AddUserModel = mongoose.model("AddUsers" , AdduserSchema);


module.exports = {
    AddUserModel
}