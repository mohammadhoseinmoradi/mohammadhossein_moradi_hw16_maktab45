const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Api = require('./routes/Api');

const Company = require('./routes/Company');
const Employee = require('./routes/Employee');
app.use('/Company', Company);
app.use('/Employee', Employee);
// todo  -------------------------------------   < database > --------------------------------

app.use('/', Api);
app.get('/public/stylesheets/Home.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/stylesheets/Home.css'));
})
app.get('/public/javascripts/Company.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/javascripts/Company.js'));
})
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/Company_hw16', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.connect(
    'mongodb://localhost:27017/Employee_hw16', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// todo  -------------------------------------   </ database > --------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;