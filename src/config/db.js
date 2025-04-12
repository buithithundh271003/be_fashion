require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/nhasachtv";
const mongoose = require("mongoose");

const connectDb = () => {
    return mongoose.connect(MONGODB_URL)
        .then(() => {
            console.log('Connected to MongoDB successfully');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
            throw error;
        });
}

// gqyfoZL6OVHCHENM
// buithithundh2003
module.exports = { connectDb };