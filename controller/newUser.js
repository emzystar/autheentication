const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// header, payload- Id, signature
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d'})
}

const handleError = (err) => {
  // error messages codes - 11000
  let errors = { email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email is already in use";
    return errors;
  }
  if (err.message === "user not registered yet") {
    errors.email = "This Email has not ben registered";
  }
  if (err.message === "invalid Email or password") {
    errors.email = "invalid Email or password";
    errors.password = "Invalid Email or Password";
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const getRegisteredPage = (req, res) => {
    res.render('signup')
}

const getLoginPage = (req, res) => {
    res.render('login')
}

const getDashboardPage = (req, res) => {
    res.render('dashboard')
}

const logout = (req, res) => {
  res.cookie('jwt', ' ',{ maxAge: 1000})
  res.redirect('/login')
}

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // create the user on the database
    const user = await User.create({ email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json({ success:false, errors });
  }

};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "please provide necessary information" });
    }
    const user = await User.findOne({ email });
    if (user) {
      const authenticated = await bcrypt.compare(password, user.password);
      if (authenticated) {

        // set token

      const token = generateToken(user._id);
      const time = 3 * 24 * 60 * 60 * 1000;
      res.cookie("jwt", token, {maxAge: time})
        return res.status(200).json({ success: true, data: user });
      }
      throw Error("invalid email or password");
    }
    throw Error("user not registered yet");

  } catch (error) {
    const errors = handleError(error);
    res.status(400).json({success: false, errors });
  }
};

module.exports = { register, login, getRegisteredPage, getLoginPage, getDashboardPage, logout};
