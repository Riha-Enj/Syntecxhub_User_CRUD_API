const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://rehamtarekzaki_db_user:3wzq1rDA1jJRkuAB@cluster0.mkdcscn.mongodb.net");
        console.log("MongoDB Connected Successfully via Mongoose!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;