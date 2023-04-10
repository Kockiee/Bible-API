const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateBodyToken  = (req, res, next) => {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid requisition, token is not valid"});
        req.userId = decoded.userId;
        next();
    });
};

const validateBodyUserAndPassword  = (req, res, next) => {
    const { body } = req

    if (body.username == undefined || body.password == undefined) {
        res.status(400).json({ message: "The fields \"username\" or \"password\" needs to be specified"})
    }
    if (body.username == "" || body.password == "") {
        res.status(400).json({ message: "The username or password cannot be empty"})
    }

};

module.exports = {
    validateBodyToken,
    validateBodyUserAndPassword
};