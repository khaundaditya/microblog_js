// Import Mongoose and password Encrypt

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


// Schema for User model

var userSchema = mongoose.Schema({
   // using local for local strategy passport
   local : {
       name: String,
       email: String,
       password: String
   }
});

//Encrypt Password
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Verify if password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

// Create the model for user and expose it for the app
module.exports = mongoose.model('User', userSchema);
