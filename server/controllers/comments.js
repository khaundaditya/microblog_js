
var gravatar = require('gravatar');
// get Comments model
var Comments = require('../models/comments');
exports.list = function(req, res){
    //List comments
    Comments.find().sort('-created').populate('user', 'local.email').exec(function(error, comments) {
       if (error) {
           return res.send(400, {
               message: error
           });
       }
       //Render result
        res.render('Comments',{
           title: 'Comments Page',
           comments: comments,
            gravatar: gravatar.url(comments.email,
                {s: '80', r: 'x', d: 'retro'}, true)
        });
    });
};
// Create comments
exports.create = function(req, res) {
  // Create a new comment with request body
  var comments = new Comments(req.body);
  // Set current user(id)
    comments.user = req.user;
    comments.save(function(error) {
       if(err) {
           return res.send(400,
               {message: error });
       }
       // Redirect to comments
        res.redirect('/comments');
    });
};
// Comments authorization middleware
exports.hasAuthorization = function(req, res, next){
  if(req.isAuthenticated())
      return next();
  res.redirect('/login');
};


