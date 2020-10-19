

const express = require('express');
const router = express.Router();
const daysController = require('../controllers/daysController');
const auth = require('../middlewares/authentication');
const { check } = require('express-validator');


// /booking
router.post('/',
    auth, 
    [
        check('days', 'Agregar un turno valido. Ej"Lunes-Miercoles-Viernes" o "Martes-Jueves-Sabado"').isString()
    ],
    daysController.createDays
);

router.get('/', 
auth,
daysController.getDays
)

router.put('/:id',
auth,
//agregar middleware que verifica si es admin.
[
    check('days', 'Agregar un turno valido. Ej"Lunes-Miercoles-Viernes" o "Martes-Jueves-Sabado"').isString()
],
daysController.updateDays
)

router.delete('/:id',
auth,
//agregar middleware que verifica si es admin.
daysController.deleteDays
)

module.exports = router;