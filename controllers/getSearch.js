const path = require('path');
const Post = require('../database/models/Post');
const Fuse = require('fuse.js');
const url = require('url');



var options = {
	shouldSort: true,
	threshold: .4,
	maxPatternLength: 20,
	keys: ["title", "description", "tags"]
}

module.exports = async (req, res) => {
	const post = await Post.find({});
	var fuse = new Fuse(post, options);
	var searches = req.query.search;
	var posts = fuse.search(searches);
	console.log(posts);
	res.render("search", {posts});
};
