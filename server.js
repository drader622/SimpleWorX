const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require("method-override");
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const cors = require('cors');
const pusherRoutes = require('./routes/pusher');
const indexRoutes = require('./routes/index');
const workOrdersRoutes = require('./routes/workOrders');
const woInfoRoutes = require('./routes/woInfo')
const accountRoutes = require('./routes/account');
const createRoutes = require('./routes/create');
const teamRoutes = require('./routes/team');

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport)

//Connect To Database
connectDB();

//Using EJS for views
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static(__dirname + '/public'));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Logging
app.use(logger('dev'));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
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

//Use flash messages for errors, info, ect...
app.use(flash());
  
//Routes
app.use('/submitWO', pusherRoutes);
app.use('/', indexRoutes);
app.use('/workOrders', workOrdersRoutes);
app.use('/woInfo', woInfoRoutes)
app.use('/account', accountRoutes);
app.use('/create', createRoutes);
app.use('/team', teamRoutes);

//Server Running
app.listen(process.env.PORT, () => {
    console.log(`Running server on port ${process.env.PORT}`);
});


