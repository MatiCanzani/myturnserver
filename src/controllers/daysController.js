const Days = require('../models/DaysSchema');
const { validationResult } = require('express-validator');

exports.createDays = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //new classesDays 
        const classDays = new Days(req.body);

        classDays.creator = req.user.id;

        classDays.save();
        res.status(201).json(classDays)
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}

exports.getDays = async(req,res) =>{
    try {
        const classDays = await Days.find({creator: req.user.id});
        console.log(classDays)
        res.json({classDays});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.updateDays = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { days }= req.body;
    const newDays = {};
    if(days) {
        newDays.days = days;
    }
    console.log(newDays)

    try {
        //check classDay id
        let classDays = await Days.findById(req.params.id);
        
        //if class Days exists
        if(!classDays) {
            res.send(400).json({msg: 'Dias de clases no encontrado'});
        };

        // //check if is admin
        // if(days.creator.toString() !== req.user.id);
        // return res.status(401).json({msg: 'No tiene permisos para realizar esta acción'})

        classDays = await Days.findByIdAndUpdate({_id: req.params.id}, {$set : newDays}, {new: true});
        res.json({days});

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en la acutalización')
    }
}

exports.deleteDays = async (req,res) => {
    try {
        //check classDay id
        let classDays = await Days.findById(req.params.id);
        
        //if class Days exists
        if(!classDays) {
            res.send(400).json({msg: 'Dias de clases no encontrado'});
        };

        // //check if is admin
        // if(days.creator.toString() !== req.user.id);
        // return res.status(401).json({msg: 'No tiene permisos para realizar esta acción'})

        classDays = await Days.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Dia de clases eliminado'});

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en la acutalización')
    }
}