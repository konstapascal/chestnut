const express = require('express');
const validator = require('express-validator');

const router = express.Router(); 

const userControllers = require('../controllers/users-controllers');

router.get('/', userControllers.getUsers);

router.post('/signup', 
[
    validator
    .check('userName')
        .not()
        .isEmpty(),
    validator
    .check('email')
        .normalizeEmail()
        .isEmail(),
    validator.check('password').isLength({min: 8})
    
]
, userControllers.signup);

router.post('/login', userControllers.login);

module.exports = router;

