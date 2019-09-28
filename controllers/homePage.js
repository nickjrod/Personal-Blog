const Post = require('../database/models/Post');

module.exports = async (req, res) => {
	const posts = await Post.find({});
	message = {message: req.session.message, val: (req.session.message != null)};
	res.render("index", {posts, message});
};


