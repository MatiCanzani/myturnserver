const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');
require('dotenv').config({path: __dirname + '/../../variables.env'}); 

exports.userAuth = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { password, email } = req.body;
    try {
        //register user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no existe' })
        }
        // correct passwrod
        const passCorrect = await bcrypt.compare(password, user.password);
        if (!passCorrect) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }
        //Sign JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        JWT.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ token })
        });
    } catch (error) {
        console.log(error.res)
    }
}

//get user authenticated

exports.authenticathedUser  = async (req,res ) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
        
    }
}

exports.adminUser  = async (req,res ) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user.isAdmin)
        if(user.isAdmin === true) {
        res.json({user})
        }else{
            res.json({msg: 'No tenes derechos de  Administrador'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}


