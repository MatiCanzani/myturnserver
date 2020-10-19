const server = require('../app');
const path = require('path');
const app = require('express');
require('dotenv').config({path: 'variables.env'}); 

//Settings
const PORT =  process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(process.env.DB_MONGO)
    console.log(`Server running on port ${PORT}`)
});
// server.set('views', path.join(__dirname, 'views'))
// server.set(app.static(path.join(__dirname, 'public')))

//Midelwares
server.use(app.urlencoded({extended: false}));


module.exports  = server