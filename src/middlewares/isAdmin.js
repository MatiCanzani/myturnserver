const jwt = require('jsonwebtoken');

const isAdmin = ((req, res, next) => {
    //read token
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: "No hay token. No puede tener acceso" })
    }
    try {
        const admin = jwt.verify(token, process.env.SECRET);
        console.log(admin)
        req.user = admin.user.isAdmin;
        next();

    } catch (error) {
        if (admin.isAdmin !== 1) {
            res.status(404).json({ msg: "'No posee permisos para realizar esta acción" })
        };

    }
})

module.exports = isAdmin
