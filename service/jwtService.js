const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.JWT_SECRET || ""

// Function to sign a JWT
function generateToken(payload, expiresIn = 3600000) {
    return jwt.sign(payload, secretKey);
}

// Function to verify a JWT
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        console.error('Invalid token', err);
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};