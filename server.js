const express = require('express');
const app = express();
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const pusher = require('./routes/pusher')
const PORT = 8000;
require('dotenv').config({ path: './.env' });

let dbConnectionStr = process.env.DB_STRING;
mongoose.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected To Database');
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


//routes
app.use('/submitWO', pusher);
app.use('/', require('./routes/index'));
app.use('/workOrders', require('./routes/workOrders'));
app.use('/user', require('./routes/user'));
app.use('/account', require('./routes/account'));
app.use('/create', require('./routes/create'));
app.use('/team', require('./routes/team'));

app.listen(process.env.PORT || PORT, (req, res) => {
    console.log(`Running server on port ${PORT}`);
});


