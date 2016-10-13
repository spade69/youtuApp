var express = require('express');

var favicon = require('serve-favicon'); //favicon
var logger = require('morgan'); //process log file
var cookieParser = require('cookie-parser');//parse cookie
// 静态资源请求路径
var path = require('path');
var bodyParser = require('body-parser');
//database
var mongoose=require('mongoose');
var user=require('./models/model');
var settings=require('./settings');
//routing
var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();//creare a express object
//database
//connect to database
//mongoose.connect('mongodb://localhost/youtu');

// view engine setup  _dirname为全局变量，存储当前正在执行的脚本的所在目录
app.set('views', path.join(__dirname, 'views'));//root directory of 
app.set('view engine', 'jade');//set the template engine

// uncomment after placing your favicon in /public 
// 设置_dirname/public/favicon.ico 为favicon图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //加载日志middleware dev
app.use(bodyParser.json()); //加载解析json middleware
//加载解析urlencoded 请求体的middleware
app.use(bodyParser.urlencoded({ extended: false }));
//加载解析cookie的middleware
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));
//express.static added by Jason 同时挂载路径
app.use('/static',express.static('public'));

// routing controller here we load the router!
routes(app);

//testing db
var findDocument=function(db,callback){
  var collection=db.collection('documents');
  //find some documents
  collection.find({}).toArray(function(err,docs){
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace  in browser
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
