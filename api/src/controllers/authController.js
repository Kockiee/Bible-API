const authModel = require('../models/authModel');

const createUser = async(req, res) => {
    const createdUser = await authModel.createUser(req.body);
    return res.status(201).json(createdUser);
};

const getToken = async(req, res) => {
    const token = await authModel.getToken(req.body);
    return res.status(200).json(token);
};

module.exports = {
    createUser,
    getToken
};
