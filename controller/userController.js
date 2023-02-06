const User = require('../model/user');
const bcrypt = require('bcrypt');

// error handling
// integrate views
// authentication - jsonwebtoken


// sure that they provide email and password
const register = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
       return res.status(404).json({ success: false, message:'please provide a vaild email or password'})
    }
// email hasnt been registered
const userExist = await User.findOne({email})
if(userExist) {
    return res.status(400).json({succes: false, message: "Email is in use already"})
}

// protect user info
const salt = await bcrypt.genSalt();
const hashedPassword = await bcrypt.hash(password, salt);
// create the user
try {
    const user = await User.create({email, password: hashedPassword})
    res.status(201).json({success: true, data: user})

}catch(error) {
    console.log(error)
res.status(500).json({msg: false})

};
}
const login =  async (req, res) => {
    const { email, password } = req.body;
    // email and password
    if(!email || !password) {
        return res.status(404).json({message: 'please provide necessary information'})
    }
    // user has registered
    const user = await User.findOne({email})
    if(!user) {
        return res.status(400).json({success: false, message: "email not found, please sign up"})
    }

    // provide the correct details, email and password
    const authenticated =  user.email === email && (await bcrypt.compare(password, user.password))
    if(authenticated) {
        user.password = " "
        return res.status(200).json({success: true, data: user})
    } else{
        return res.status(404).json({success: false, message: "invalid email or password"})
    }
}

module.exports = {register, login}