var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
require("dotenv").config();

var indexRouter = require('./routes/index');
var auth = require("./routes/auth")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( ( req, res, next ) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin','Content-Type, Authorization');    
    next();
});

app.use('/api', indexRouter);
app.use('/api/auth', auth);


mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://root:root@cluster0.kt16l.mongodb.net/test?retryWrites=true&w=majority")
.then(db => console.log("Connected"))
.catch(error => console.error(error));


app.listen(PORT, ()=>{console.log('server on port 3001')})

module.exports = app;
