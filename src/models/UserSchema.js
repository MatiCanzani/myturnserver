// const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true // start/end delete spaces 
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    dni: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    date: {
        type:Date,
        default: Date.now() 
    }
    
})


module.exports = mongoose.model('User',UserSchema);