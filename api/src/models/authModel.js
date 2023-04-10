const connection = require('./connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async(user) => {
    const { username, password } = user;

    connection.execute("INSERT IGNORE INTO users (username, password) VALUES(?, ?)", [username, password]);

    const userId = await connection.execute('SELECT id FROM users WHERE username = ? AND password = ?', [username, password]);
    const token = jwt.sign({userId: userId}, process.env.JWT_SECRET);

    connection.execute("UPDATE users SET token = ? WHERE username = ? AND password = ?", [token, username]);

    return {User: {username: username, password: password}, token}
};

const getToken = async(user) => {
    const { username, password } = user;

    const [token] = await connection.execute("SELECT token FROM users WHERE username = ? and password = ?", [username, password]);
    
    return {Token: token}
};

module.exports = {
    createUser,
    getToken
};