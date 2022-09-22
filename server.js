const express = require('express');
const app = express();
const connectDB = require('./config/database')
const cors = require('cors')
const pusher = require('./routes/pusher')
require('dotenv').config({ path: './config/.env' });

connectDB();
  
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


//Routes
app.use('/submitWO', pusher);
app.use('/', require('./routes/index'));
app.use('/workOrders', require('./routes/workOrders'));
app.use('/user', require('./routes/user'));
app.use('/account', require('./routes/account'));
app.use('/create', require('./routes/create'));
app.use('/team', require('./routes/team'));

app.listen(process.env.PORT, () => {
    console.log(`Running server on port ${process.env.PORT}`);
    console.log(process.env.DB_STRING)
});


