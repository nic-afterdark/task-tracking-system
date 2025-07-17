const { login, signup } = require('../Controllers/AuthController');
const { loginValidation, signupValidation } = require('../Middleware/AuthValidation');

const router = require('express').Router()

router.post('/login',loginValidation,login)
router.post('/signup',signupValidation,signup)

module.exports = router;