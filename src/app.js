const express = require('express');
const app = express();
const cors = require('cors');

const usersRoutes = require('./routes/users');
const authRouters = require('./routes/auth');
const daysRoutes = require('./routes/days');
const hoursRoutes = require('./routes/hours');
const turnsRoutes = require('./routes/turns');


app.use(express.json({ extended: true})) // or Body Parser
app.use(cors());


//Import Routes
app.use('/users', usersRoutes);
app.use('/turns', turnsRoutes);
app.use('/auth', authRouters);
app.use('/days', daysRoutes);
app.use('/hours', hoursRoutes);
module.exports = app;
