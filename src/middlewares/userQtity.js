const Turns = require('../models/TurnsSchema');

const userQty = (async (req, res, next) => {

    try {
        const qtity = await Turns.count(req.body);
        console.log(qtity);
        if(qtity <= 19);
            next();
                
    } catch (error) {
            res.status(404).json({ msg: "'Ya no hay mas lugar en esta clase. Por favor seleccione otra" })
    }
})

module.exports = userQty
