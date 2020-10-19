require('dotenv').config();
const server = require('./config/server');
const connectDB = require('./config/dataBase');


connectDB();

server.listen(server.get('PORT'), () => {
    console.log('Serves running successfully');
})

