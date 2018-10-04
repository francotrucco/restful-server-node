require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');

const app = express();

// parse application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/users'));

mongoose.connect(process.env.urlDb, (err, res) => {
    
    if (err) throw err;

    console.log('ONLINE Database'.green);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening to PORT ${process.env.PORT}`);
});