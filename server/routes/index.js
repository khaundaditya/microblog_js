var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express from server folder' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login Page', message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
//Success go to Profile Page / Fail go to login page
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
}));


/* GET signup page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', {title: 'SignUp Page', message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
//Success go to Profile Page / Fail go to Signup page
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}));

/* GET profile page */
router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', {title: 'Profile Page', user : req.user, avatar: gravatar.url(req.user.email, {s: '100',
      r: 'x', d: 'retro'}, true) });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

/* GET Logout Page */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
