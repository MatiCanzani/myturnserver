const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const auth = require('../middlewares/authentication');

// /user
router.post('/',
    [
        check('firstName', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email','Agrega un email valido').isEmail(),
        check('password', 'Debe tener mínimo 8 caracteres').isLength({min: 8}),
    ],
      userController.createUser
);

router.get('/', 
    auth, 
    userController.getUser
    // res.send('Bienvenidos a Jaguar')
);

router.get('/:dni', 
    auth, 
    userController.getUserByDNI
    // res.send('Bienvenidos a Jaguar')
);


router.put('/:id', 
    auth, 
    userController.updateUser
)

router.delete('/:id', 
    auth, 
    userController.deleteUser
)

module.exports = router;

