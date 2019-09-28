const path = require('path');
const Post = require('../database/models/Post');

module.exports = (req, res) => {
        const {
                image
        } = req.files
       
	contents = req.body.content.split("\n");
        tags = req.body.tags.replace(/\s/g,'').split(",");
	image.mv(path.resolve(__dirname,'..', 'public/posts', image.name),(error) => {
    		Post.create({
			...req.body, 
			content: contents, 
			tags: tags, 
			image: `/posts/${image.name}`
		}, (error, post) => {
                		res.redirect('/');
                	});
        });	
};
