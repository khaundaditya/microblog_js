// load passport module

let LocalStrategy = require('passport-local').Strategy;
// load up the user model
let User = require('../models/users');

module.exports = function(passport) {
    // passport init setup
    // serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // deserialize the user
    passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
           done(err, user);
       }) ;
    });
    // Using local strategy
    passport.use('local-login', new LocalStrategy({
        // change default username and password, to email and password
        usernameField: 'email',
        'passwordField': 'password',
        'passReqToCallback': true
    },
        function(req, email, password, done){
          if (email)
              email = email.toLowerCase();
          process.nextTick(function() {
              User.findOne({'local.email' : email }, function(err, user){
                  if (err)
                      return done(err);
                  if (! user)
                      return done(null, false, req.flash('loginMessage', "Ooops! Wrong Password."));
                  else
                      return done(null, user);
              });
          });
        }));
    // Signup local strategy
    passport.use('local-signup', new LocalStrategy({
        // Change default username and password , to email and password
        usernameField: 'email',
        passwordField: 'password',
        passReqCallback: true
        },
        function(req, email, password, done){
            if (email) {
                email = email.toLowerCase();
                process.nextTick(function () {
                    // If user is not already logged in
                    if (!req.user) {
                        User.findOne({'local.email': email}, function (err, user) {
                            if (err)
                                return done(err);
                            if (user) {
                                return done(null, false, req.flash('signupMessage', "Email alrady used!"));
                            } else {
                                //Create the user
                                var newUser = new User();
                                // Get the user name fro req body
                                newUser.local.name = requ.body.name;
                                newuser.local.email = email;
                                newuser.local.password = newUser.generateHash(password);
                                //Save Data
                                newUser.save(function (err) {
                                    if (err)
                                        throw err;
                                    return done(null, newUser);
                                });
                            }
                        });
                    }
                });
            } else {
                return done(null, req.user);

            }
        }));
};