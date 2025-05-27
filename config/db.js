const mongoose = require("mongoose");

const connectToMongoDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging step

        await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); 

        console.log(" MongoDB Connected Successfully");
    } catch (error) {
        console.error(" MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = {connectToMongoDB};

