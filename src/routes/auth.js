const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth =require('../middlewares/authentication');
const isAdmin =require('../middlewares/isAdmin');


//Login
// /auth
router.post('/',
    [
        check('email','Agrega un email valido').isEmail(),
        check('password', 'Debe tener mínimo 8 caracteres').isLength({min: 8}),
    ],
    authController.userAuth
);

//get user authenticated
router.get('/',
auth,
// isAdmin,
    authController.authenticathedUser,
    authController.adminUser
)

//get user authenticated
router.get('/admin',
auth,
    authController.adminUser
)
module.exports = router;