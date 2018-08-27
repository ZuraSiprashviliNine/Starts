
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');
mongoose.connect('mongodb://axel:Abcd345h@ds131942.mlab.com:31942/axel', {
    useNewUrlParser: true
});
var db = mongoose.connection;
db.once('open', () => {
    console.log('database has been connected');
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false,
    sourceMap: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.render('error');
});
app.use((err, req, res, next) => {
    console.log(err);
    res.render('error');
});

module.exports = app;
