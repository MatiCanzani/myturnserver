// const {Schema, model} = require('mongoose');
const mongoose = require('mongoose')

const DaysSchema = mongoose.Schema({
    days: {
        type: String,
        required: true, 
        trim: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, //gives who create the class booking
        ref: 'User' // gives user Id 
    },

    
    created: {
        type: Date,
        default: Date.now()
    },
    
})


module.exports = mongoose.model('Days',DaysSchema);