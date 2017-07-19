/**
 * Created by jack on 17-7-19.
 */

var Article = require('../models/article');
var moment = require('moment');

exports.list = function (req, res, next) {
    res.render('articles');
};

exports.show = function (req, res, next) {
    var id = req.params.id;
    Article.findOne({_id: id}).then(function (article) {
        console.log(article);
        res.render('article', {article: article});
    });
};

exports.write = function (req, res, next) {
    res.render('write');
};

exports.post = function (req, res, next) {
    // console.log(req.body);
    var args = {
        author_id: req.session.user._id,
        publishDate: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    new Article(Object.assign(req.body, args)).save().then(function (article) {
        console.log(article);
        res.redirect('/user/' + req.session.user._id);
    });
    // res.render('write');
};