const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/../../variables.env'}); 

dataBase= process.env.DB_MONGO

const connectDB = async () => {
    console.log(dataBase)
    try {
        await mongoose.connect(dataBase, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected saccessfully to MongoDB')
    } catch (error) {
        console.log(error);
        process.exit(1); //stop connection try
    }

}

module.exports = connectDB


// const {JAGUARCF_MONGODB_HOST, JAGUARFCF_DB}  = process.env;
// const MONGODB_URI = `mongodb://${JAGUARCF_MONGODB_HOST}/${JAGUARFCF_DB}`;
// mongoose.connect(MONGODB_URI,{
//     useFindAndModify: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(dataBase => console.log('Conectado a la base de datos'))
//     .catch(err => console.log(err));



