/**
 * Created by jack on 17-7-19.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {type: String},
    content: {type: String},
    author_id: {type: Schema.ObjectId},
    author: Object,
    publishDate: {type: String}
});

articleSchema.index({author: 1});

module.exports = mongoose.model('article', articleSchema);
