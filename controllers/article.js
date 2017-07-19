/**
 * Created by jack on 17-7-19.
 */

var Article = require('../models/article');
var User = require('../models/user');
var moment = require('moment');
var Promise = require('bluebird');

exports.list = function (req, res, next) {
    Article.find().sort({_id: -1}).then(function (articles) {
        // console.log(articles);
        return Promise.map(articles, function (article) {
            // console.log(article);
            return User.findOne({_id: article.author_id}).then(function (user) {
                article.author = user;
                // console.log(article);
                return article;
            });
        }).then(function (articles) {
            console.log(articles);
            res.render('articles', {articles: articles});
        })
    });
};

exports.show = function (req, res, next) {
    var id = req.params.id;
    Article.findOne({_id: id}).then(function (article) {
        console.log(article);
        res.render('article', {article: article});
    });
};

exports.write = function (req, res, next) {
    if (req.session.user == null) {
        res.status(404).end('Sorry, we can\'t fetch that page');
        return;
    }
    res.render('write');
};

exports.post = function (req, res, next) {
    // console.log(req.body);
    if (req.session.user == null) {
        res.status(404).end('Sorry, we can\'t fetch that page');
        return;
    }
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