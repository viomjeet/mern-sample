const db = require('../itemdb');


const allUsers = (callback) => {
    const query = `SELECT * FROM users`;
    db.all(query, {}, callback)
}

const registerUser = (name, username, email, password, isActive, callback) => {
    const query = `INSERT INTO users(name, username, email, password, isActive) VALUES (?,?,?,?,?)`
    db.run(query, [name, username, email, password, isActive], callback)
}

const checkuser = (email, username, callback) => {
    const query = `select * from users where email=? or username=?`;
    db.all(query, email, username, callback);
}

const userLogin = (email, password, callback) => {
    const query = `select * from users where email=? and password=?`;
    db.all(query, email, password, callback);
}

const updateUser = (email, isActive, callback) => {
    const query = `update users set isActive=? where email=?`;
    db.run(query, [isActive, email], callback);
}


module.exports = { allUsers, registerUser, checkuser, userLogin, updateUser };