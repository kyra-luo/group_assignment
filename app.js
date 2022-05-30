var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//引入mysql(use mysql in this app)
var mysql =require('mysql');
const req = require("express/lib/request");

// 引入忘记密码模块;
const forget = require('./routes/forget')
// 引入登录模块
const login = require('./routes/login')
// 引入注册模块

//引入查询用户信息以及操作用户信息的模块

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//创建一个pool(create a 'pool' of connections to be used for connecting with our SQL server)
var dbconnection=mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database:'Project'
});

app.use(function (req,res,next) {
  req.pool = dbconnection ;
  next()
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('abcd1234'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(login);
app.use(forget);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(function (re,res,next){
req.pool=dbconnection;
next();
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
