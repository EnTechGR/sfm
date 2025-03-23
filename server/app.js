require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testApiRouter = require('./routes/testAPI');
var authRouter = require('./routes/auth');
const vehiclesRouter = require("./routes/vehicles");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testApiRouter);
app.use('/api/auth', authRouter);
app.use("/api/vehicles", vehiclesRouter);

module.exports = app;
