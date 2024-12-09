const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('todoDatabase.db', (err) => {
    if (err) {
        console.error(err.message)
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            todo TEXT, 
            complete NUMERIC, 
            time TEXT, 
            username TEXT,
            description TEXT
            )`, (err) => console.error(err ? err.message : "Todos Table Createted"));
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            username NUMERIC, 
            email TEXT, 
            password TEXT,
            isActive NUMERIC
        )`, (err) => console.error(err ? err.message : "Users Table Createted"))
    }
});

module.exports = db;