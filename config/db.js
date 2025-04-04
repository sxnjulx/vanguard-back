const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL || "";

const connectDB = async () => {
    mongoose.connect(DB_URL)
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    });
}

module.exports = connectDB;