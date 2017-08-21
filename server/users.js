// Set up mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Export our mongoose model, with a user name and friends list
module.exports = mongoose.model('User', new Schema({
    name: String,
    email: String
}));