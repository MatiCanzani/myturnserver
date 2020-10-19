const Hours = require('../models/HoursSchema');
const { validationResult } = require('express-validator');

exports.createHours = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //chech if hour xist
        const { hour } = req.body
        let classHour = await Hours.findOne({ hour });
        if (classHour) {
            return res.status(400).json({ msg: 'Ese horario de clase ya existe' })
        }
        //new Booking 
        const hours = new Hours(req.body);
        hours.save();
        res.status(201).json({hour})
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}
 
exports.getHours = async(req,res) =>{
    const { hours } = req.body
    try {
        //get existing Hours 
        const hours = await  Hours.find();
        res.status(200).json(hours)
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}
