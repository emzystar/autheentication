const router = require('express').Router()

const { register, login, getRegisteredPage, getLoginPage, getDashboardPage} = require("../controller/newUser")


router.post("/register", register);
router.post("/login", login)
router.get('/register', getRegisteredPage)
router.get('/login', getLoginPage)
router.get('/dashboard', getDashboardPage)



module.exports = router;