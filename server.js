const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const cors = require('cors');
const pusherRoutes = require('./routes/pusher');
const indexRoutes = require('./routes/index');
const workOrdersRoutes = require('./routes/workOrders');
const accountRoutes = require('./routes/account');
const createRoutes = require('./routes/create');
const teamRoutes = require('./routes/team');

require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport)

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(logger('dev'))

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
  
//Routes
app.use('/submitWO', pusherRoutes);
app.use('/', indexRoutes);
app.use('/workOrders', workOrdersRoutes);
app.use('/account', accountRoutes);
app.use('/create', createRoutes);
app.use('/team', teamRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Running server on port ${process.env.PORT}`);
});


