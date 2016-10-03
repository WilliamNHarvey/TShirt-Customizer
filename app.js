var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(morgan());

var connection = mysql.createConnection({
	host 	 : 'us-cdbr-iron-east-04.cleardb.net',
	user 	 : 'bb1f84da0b6428',
	password : 'f7cbf300',
	database : 'heroku_59d4cdfdabbc8e9'
})

connection.connect();

connection.query('CREATE TABLE user_saves (user_id int, ip VARCHAR(100),' +
        'save1 int, save2 int, save3 int, save4 int, save5 int, save6 int, PRIMARY KEY(user_id))',
function(err, result){
// Case there is an error during the creation
if(err) {
console.log(err);
} else {
console.log("Table user_saves Created");
}
});

connection.query('CREATE TABLE saves (save_id int, save_group int,' +
        'img_location VARCHAR(100), text VARCHAR(100), left int, top int, angle int, PRIMARY KEY(save_id))',
function(err, result){
// Case there is an error during the creation
if(err) {
console.log(err);
} else {
console.log("Table saves Created");
}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
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
