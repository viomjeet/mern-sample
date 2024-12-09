const db = require('../itemdb');


const readItem = (username, callback) => {
    const sql = `SELECT * FROM todos where username=?`;
    db.all(sql, username, callback)
}

const createItem = (todo, complete, time, username, description, callback) => {
    const sql = `INSERT INTO todos(todo,complete,time,username, description) VALUES (?,?,?,?,?)`
    db.run(sql, [todo, complete, time, username, description], (err) => {
        callback(err, { id: this.lastID });
    })
}

const updateItem = (id, todo, complete, time, username, description, callback) => {
    const sql = `update todos set todo=?, complete=?, time=?, username=?, description=? where id=?`
    db.run(sql, [todo, complete, time, username, description, id], callback)
}

const deleteItem = (id, callback) => {
    const sql = `DELETE FROM todos WHERE id=?`;
    db.run(sql, id, callback);
}

const getItemByid = (id, callback) => {
    const sql = `select * from todos WHERE id=?`;
    db.all(sql, id, callback);
}

module.exports = { readItem, createItem, deleteItem, getItemByid, updateItem };