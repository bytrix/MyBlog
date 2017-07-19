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

module.exports.getCompleteArticle = function (article_id) {
    // return id;
    return Article.findOne({_id: article_id}).then(function (article) {
        var author_id = article.author_id;
        // User.findOne({_id: author_id}).then()
        // return author_id;
        return User.findOne({_id: author_id});
    });
};