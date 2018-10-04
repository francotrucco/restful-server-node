const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/users');

const app = express(); 

app.get('/users', (req, res) => {

    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;
    let options = {
        active: true
    }

    User.find(options, 'name email role active')
        .skip(from)
        .limit(limit)
        .exec((err, users) =>{
            if (err) {
                return users.status(400).json({
                    ok: false,
                    err
                });
            }
            User.count(options, (err, count) => {
                res.json({
                    ok: true,
                    count,
                    users
                });
            })
        });
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

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, dbUser) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: dbUser
        });

    });
});

app.put('/users/:id', (req, res) => {
    let id = req.params.id;
    let obj = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'active']);

    User.findByIdAndUpdate(id, obj, {
        new: true,
        runValidators: true
    }, (err, dbUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: dbUser
        });
    });
});

app.delete('/users/:id', (req, res) => {
    let id = req.params.id;
    let state = {
        active: false
    };
    let options = {
        new: true
    }

    User.findByIdAndUpdate(id, state, options, (err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: deletedUser
        });
    });
});

module.exports = app
