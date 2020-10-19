const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');
// const SECRET = process.env.SECRET


exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { password, email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El Usuairo ya existe' })
        }
        user = new User(req.body);
        //hash
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        //jwt
        const payload = {
            user: {
                id: user.id
            }
        };
        
        //sign JWT
        JWT.sign(payload, process.env.SECRET, {      
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ token: token })
            console.log(token)
        });

        res.json({ msg: 'Usuario creado con exito' })
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}


exports.getUser = async(req,res) =>{
    // const {userDay, userHours} = req.query
    try {
        const user = await User.find()
        console.log(user)
        res.json({user});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.getUserByDNI = async(req,res) =>{
    const { dni } = req.params
    console.log(dni);
    try {
        const user = await User.find({dni: dni})
        console.log(user)
        res.json({user});
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}


exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    //get user info
    const userId = req.params.id
    const userActive = req.body
    const option = { new: true }
    
    try {
        //check Id
        if(!userId) {
            return res.status(400).json({msg: 'Usuario no encontrado'})
        }
        const  user = await User.findByIdAndUpdate(userId, userActive, option);
        console.log(user)
        res.json({user});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Error en el servidor '})
    }
};


exports.deleteUser = async (req, res) => {
    const userId = req.params.id
	try {
        if(!userId) {
            return res.status(400).json({msg: 'Usuario no encontrado'})
        }
        const deleteUser = await User.findByIdAndDelete(userId)
        res.json({deleteUser})
		} catch (error) {
            console.log(error);
            res.status(500).json({msg: 'No se pudo eliminar el usuario'});
	}
};