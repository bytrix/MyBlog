/**
 * Created by jack on 17-7-19.
 */

var exporess = require('express');
var router = exporess.Router();

var sign = require('./controllers/sign');
var article = require('./controllers/article');
var user = require('./controllers/user');

router.get('/', article.list);
// router.get('/user/:id', user.detail);
router.get('/user', user.detail);

router.get('/signin', sign.showSignin);
router.post('/signin', sign.signin);
router.get('/signup', sign.showSignup);
router.post('/signup', sign.signup);
router.get('/signout', sign.signout);

router.get('/write', article.write);
router.post('/write', article.post);

router.get('/article/:id', article.show);

module.exports = router;