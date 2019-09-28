const mongoose = require('mongoose');
const dateformat = require('dateformat');

var date = new Date();
var dateString = dateformat(date, 'mm.dd.yyyy');




const PostSchema = new mongoose.Schema({
	title: String,
	description: String,
	content: [String],
	createdAt: 
		{type: String,
		default: dateString
		},
	image: String,
	tags: [String]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
