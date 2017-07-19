/**
 * Created by jack on 17-7-19.
 */

var User = require('../models/user');
var moment = require('moment');


// 登陆
exports.signin = function (req, res, next) {
    // console.log('sign in');
    // console.log(req.body);
    User.findOne(req.body).then(function (user) {
        if (user) {
            req.session.user = user;
            console.log(req.session);
            res.redirect('/');
        } else {
            res.render('signin', {message: 'Invalid username or password'});
        }
    })
};
exports.showSignin = function (req, res, next) {
    res.render('signin');
};

// 注册
exports.signup = function (req, res, next) {
    // console.log('sign up');
    User.findOne({username: req.body.username}).then(function (user) {
        // console.log(user);
        if (user) {
            res.render('signup', {message: 'Username already exists!'});
        } else {
            new User(Object.assign(req.body, {joinDate: moment().format('YYYY-MM-DD')})).save()
                .then(function (user) {
                    console.log(user);
                    res.redirect('/signin');
                });
        }
    });
};
exports.showSignup = function (req, res, next) {
    res.render('signup');
};

exports.signout = function (req, res, next) {
    req.session.destroy();
    console.log(req.session);
    res.redirect('/');
};