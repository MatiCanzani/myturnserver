    const Turns = require('../models/TurnsSchema');
const User = require('../models/UserSchema');
const { validationResult } = require('express-validator');

exports.creatTurn = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        //new Turn 
        const turn = new Turns(req.body);
        turn.userName = req.user.id;
        turn.save();
        res.status(201).json(turn)
    } catch (error) {
        console.log(error)
        res.status(500).send('hubo un error')
    }
}

exports.getUserTurns = async(req,res) =>{
    try {
        const userTurn = await Turns
        .find(req.query)
        .populate('userName','firstName lastName')
        console.log(userTurn)
        res.json({userTurn});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.countUserByTurn = async(req,res) =>{
    try {
        const userTurn = await Turns.count(req.query);
        if(userTurn === 0) { 
            res.json("No hay usuarios Registrados");
        }
        res.json({userTurn});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

//find user's schedule class turn
exports.getUserTurnById = async(req,res) =>{
    try {
        const userTurn = await Turns.find({userName: req.user.id});
        res.json({userTurn});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.updateUserTurn = async (req,res) => {
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
        let turn = await Turns.findById(req.params.id);
        
        //if class Days exists
        if(!turn) {
            res.send(400).json({msg: 'usuario no encontrado'});
        };

        // //check if is admin
        // if(days.creator.toString() !== req.user.id);
        // return res.status(401).json({msg: 'No tiene permisos para realizar esta acción'})

        turn = await Turns.findByIdAndUpdate({_id: req.params.id}, {$set : newDays}, {new: true});
        res.json({days});

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error en la acutalización')
    }
}

//delete user's schedule class turn
exports.deleteUserTurnById = async(req,res) =>{
    try {
        const TurnByUser = await Turns
        .findOneAndDelete(req.query)
        console.log(TurnByUser)
        res.status(201).send('El usuario se elimino del turno con exito!');
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}