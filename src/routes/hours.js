
const express = require('express');
const router = express.Router();
const hoursController = require('../controllers/hoursController');
const { check } = require('express-validator');

// /booking
const classHour = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
router.post('/',
    [
        check('hour', 'Debe colocar rango de horario: Ej: 13:00').isString(`${classHour}`),
        
    ],
    hoursController.createHours
);

router.get('/',
hoursController.getHours
    )
module.exports = router;