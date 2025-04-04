const express = require("express");
const { handleUserLogin } = require("../controllers/userController");
const userRoutes = express.Router();

userRoutes.post("/authenticate", handleUserLogin )



module.exports = userRoutes

