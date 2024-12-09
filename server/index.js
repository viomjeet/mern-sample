const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = (process.env.port || 3200);
app.use(cors());
const { readItem, createItem, deleteItem, getItemByid, updateItem } = require('./databases/todos/todos');

const { allUsers, registerUser, checkuser, userLogin, updateUser } = require('./databases/login/users');

/*Todos___________________________________________ START___*/
app.post('/api/todos', (req, res) => {
    const { username } = req.body;
    readItem(username, (err, rows) => {
        try {
            err ? res.status(500).send(err.message) : res.status(200).json(rows);
        } catch (er) {
            res.send(err.message);
        }

    });
});
app.get('/api/todos/:id', (req, res) => {
    getItemByid(req.params.id, (err, rows) => {
        err ? res.status(500).send(err.message) : res.status(200).json(rows);
    });
});
app.post('/api/addtodos', (req, res) => {
    const { todo, complete, time, username, description } = req.body;
    createItem(todo, complete, time, username, description, (err, data) => {
        res.status(err ? 500 : 200).send(err ? err.message : 'Item is added');
    });
});
app.delete('/api/items/:id', (req, res) => {
    deleteItem(req.params.id, (err) => {
        res.status(err ? 500 : 200).send(err ? err.message : 'Item deleted successfully.');
    });
});
app.post('/items/update/:id', (req, res) => {
    const { todo, complete, time, username, description } = req.body;
    updateItem(req.params.id, todo, complete, time, username, description, (err) => {
        res.status(err ? 500 : 200).send(err ? err.message : 'Item updated successfully.');
    });
});
/*Todos___________________________________________ ENDS___*/

/*Login___________________________________________ START___*/
app.get("/api/allUsers", (req, res) => {
    allUsers((err, rows) => {
        err ? res.status(500).send(err.message) : res.status(200).json(rows);
    });
})
app.post('/api/register', (req, res) => {
    const { name, username, email, password, isActive } = req.body;
    checkuser(email, username, (err, rows) => {
        if (err) {
            res.send(err.message);
        } else if (rows !== null && rows.length > 0) {
            return res.send("Already exists.");
        } else {
            try {
                registerUser(name, username, email, password, isActive, (err) => {
                    res.status(err ? 500 : 200).send(err ? err.message : 'User registered successfully.');
                });
            } catch (err) {
                res.send(err.message);
            }
        }
    });
});

app.post('/api/checkuser', (req, res) => {
    const { email, username } = req.body;
    checkuser(email, username, (err, rows) => {
        res.send(err ? err.message : rows);
    });
})

app.post('/api/userLogin', (req, res) => {
    const { email, password } = req.body;
    userLogin(email, password, (err, rows) => {
        if (err) {
            res.send(err.message);
        } else if (rows !== null && rows.length > 0) {
            try {
                updateUser(email, 1, (err) => {
                    if (err) {
                        res.send(err.message);
                    } else {
                        return res.send(email);
                    }
                });
            } catch (err) {
                res.send(err.message);
            }
        } else {
            return res.send("Invalid credentials.");
        }
    });
});

app.post('/api/logout', (req, res) => {
    const { email } = req.body;
    updateUser(email, 0, (err) => {
        if (err) {
            res.send(err.message);
        } else {
            return res.send("updated.");
        }
    });
})


/*Login___________________________________________ ENDS___*/
app.listen(port, (err) => {
    return console.log(err ? err.message : `Server running on port ${port}`);
})