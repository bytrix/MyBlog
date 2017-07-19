/**
 * Created by jack on 17-7-19.
 */

var express = require('express');
var session = require('express-session');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const db_url = 'mongodb://localhost:27017/my_weibo';

var app = express();
var main_router = require('./main_router');
app.engine('ejs', ejs.renderFile);
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'secret'
}));
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use('/', main_router);

console.log('listening at http://localhost:3000');
mongoose.connect(db_url, function (err) {
    if (err) {
        console.log('failed to connect database');
    } else {
        console.log('connect to database successfully!');
    }
});
app.listen(3000);