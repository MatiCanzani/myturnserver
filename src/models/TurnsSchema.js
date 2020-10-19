// const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const TurnsSchema = mongoose.Schema({
    userDay: {
        type: String,
        trim: true
    },

    userHours: {
        type: String,
        trim: true, 
    },

    userSatHours: {
        type: String,
        trim: true, 
    },

    userName: {
        type: mongoose.Schema.Types.ObjectId, //gives who create the class booking
        ref: 'User' // gives user Id 
    },
    
    created: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.model('Turns',TurnsSchema);