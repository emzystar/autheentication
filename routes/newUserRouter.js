const router = require('express').Router()
const requiredAuthProcess = require('../middleware/auth')

const { register, login, getRegisteredPage, getLoginPage, getDashboardPage, logout} = require("../controller/newUser")


router.post("/register", register);
router.post("/login", login)
router.get('/register', getRegisteredPage)
router.get('/login', getLoginPage)
router.get('/dashboard',requiredAuthProcess, getDashboardPage)
router.get('/logout',logout)



module.exports = router;