/**
 * Created by jack on 17-7-19.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    joinDate: String
});

module.exports = mongoose.model('user', userSchema);
