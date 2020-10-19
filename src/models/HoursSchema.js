
const mongoose = require('mongoose')

const HoursSchema = mongoose.Schema({
    hour: {
        type: String,
        required: true, 
        trim: true, 
    },

    days: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Days'
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId, //gives who create the class hour
        ref: 'User' // gives user Id 
    },
    
    created: {
        type: Date,
        default: Date.now()
    },
    
})

module.exports = mongoose.model('Hours',HoursSchema);
  