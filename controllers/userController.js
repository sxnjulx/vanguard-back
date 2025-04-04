const { generateToken } = require('../service/jwtService');
const User = require('../models/user');

const handleUserLogin = async (req, res )=>{
    console.log("authenticating user")
    try{
        const {email, password} = req.body;
        const user = await User.findOne({username : email});
        if(user && user.password === password){
            const jwtToken = generateToken(email)
            res.status(200).json({ message: 'Login successful', token: jwtToken });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.log(`error while logging ${error}`)
        res.status(500).json({
            message : `error ${error}`
        });
        
    }


}

module.exports = { handleUserLogin}