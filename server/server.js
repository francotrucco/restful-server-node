const express = require('express');
const bodyParser = require('body-parser');
require('./config/config');
const app = express();

// parse application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

app.get('/users', (req, res) => {

    let users = [{
        "username": "ftrucco",
        "name": "Franco Trucco",
        "age": 23
    }, {
        "username": "nburdisso",
        "name": "Nahuel Burdisso",
        "age": 22
    }];

    res.json(users);
});

app.get('/users/:id', (req, res) => {
    let id = req.params.id;

    let user = {
        id,
        "username": "ftrucco",
        "name": "Franco Trucco",
        "age": 23
    }

    res.json(user)
});

app.post('/users', (req, res) => {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'The name is required'
        });
    } else {
        res.status(201).json({
            body
        });
    }
});

app.put('/users', (req, res) => {
    let body = req.body;


});

app.delete('/users', (req, res) => {

});

app.listen(process.env.PORT, () => {
    console.log(`Listening to PORT ${process.env.PORT}`);
});