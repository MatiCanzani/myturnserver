

const express = require('express');
const router = express.Router();
const turnsController = require('../controllers/turnController');
const auth = require('../middlewares/authentication');
const { check } = require('express-validator');
const userQty = require('../middlewares/userQtity')

// /booking
router.post('/',
    auth, 
    userQty,
    [
        check('userDay', 'Agregar un turno valido. Ej"Lunes-Miercoles-Viernes" o "Martes-Jueves-Sabado"').isString()
    ],
    turnsController.creatTurn
);

router.get('/', 
auth, 
turnsController.getUserTurns
);

router.get('/userCount', 
auth, 
turnsController.countUserByTurn
);

router.get('/:id', 
auth,
turnsController.getUserTurnById
)

router.delete('/:id', 
auth,
turnsController.deleteUserTurnById
)

router.put('/:id',
auth,
//add a middleware to check if is admin?? 
[
    check('days', 'Agregar un turno valido. Ej"Lunes-Miercoles-Viernes" o "Martes-Jueves-Sabado"').isString()
],
turnsController.updateUserTurn
)

module.exports = router;