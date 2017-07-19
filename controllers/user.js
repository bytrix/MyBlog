/**
 * Created by jack on 17-7-19.
 */

var User = require('../models/user');
var Article = require('../models/article');
var Promise = require('bluebird');
var mongoose = require('mongoose');

exports.detail = function (req, res, next) {
    // console.log(req.params.id);
    User.findOne({_id: req.params.id}).then(function (user) {
        Article.find().sort({_id:-1}).then(function (articles) {
            // console.log(articles);
            // console.log(Article.getCompleteArticle(mongoose.Schema.ObjectId('596f22a3d6d1543ca6504b02')));
            // res.render('user', {articles: articles});
            // return articles;
            return Promise.map(articles, function (article) {
                // console.log(article.author_id);
                return User.findOne({_id: article.author_id}).then(function (user) {
                    // console.log(user.username);
                    article.author = user;
                    // console.log(article);
                    return article;
                });
            });
            // console.log(articles);
        }).then(function (articles) {
            console.log(articles);
            res.render('user', {articles: articles});
        });
    }, function (err) {
        res.status(404).end(err.message);
    });
};
