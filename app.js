var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression')

//var index = require('./routes/index');
var fetchNearYou = require('./routes/fetchNearYou');
var fetchPopular = require('./routes/fetchPopular');
var fetchWorldwide = require('./routes/fetchWorldwide');
var fetchMostLiked = require('./routes/fetchMostLiked');
var search = require('./routes/search');
var like = require('./routes/like');
var fetchNewLocationData = require('./routes/fetchNewLocationData');
var fetchLocation = require('./routes/fetchLocation');


var app = express();

//start DB
var mongoose = require('mongoose');
var mongopath = require('./mongopath.js');
mongoose.connect(mongopath);

//to get IP
var requestIp = require('request-ip');
app.use(requestIp.mw());

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs');


//allow cross orgins for development

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);


//compress images
app.use(compression());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./static/build', {
  maxAge: 1000 * 60 * 60 /*set to 1 hour cache */
}));

//app.use('/', index);
app.use('/search', search);
app.use('/fetchNearYou', fetchNearYou);
app.use('/fetchPopular', fetchPopular);
app.use('/fetchWorldwide', fetchWorldwide);
app.use('/fetchMostLiked', fetchMostLiked);
app.use('/like', like);
app.use('/fetchNewLocationData', fetchNewLocationData);
app.use('/fetchLocation', fetchLocation);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error: err});
});

module.exports = app;