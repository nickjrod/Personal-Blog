const path = require('path');
const Post = require('../database/models/Post');
const AWS = require('aws-sdk');


module.exports = (req, res) => {
        const {
                image
        } = req.files
	const s3 = new AWS.S3({
    		accessKeyId: process.env.AWS_ACCESS_KEY,
    		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	});
	var bucket = 'nicks-blog-bucket';
	var imageName = image.name;
	var path_start = 'public/posts/';
	var myKey = path_start+imageName;
	var url_base = "https://nicks-blog-bucket.s3-us-west-1.amazonaws.com/public"	
	params = {Bucket: bucket, Key: myKey, Body: image.data};
	s3.putObject(params, function(err, data) {
		if(err){
			console.log(err)
		} else {
			console.log("Successfully uploaded")
		}
	});
	
	contents = req.body.content.split("\n");
        tags = req.body.tags.replace(/\s/g,'').split(",");
		
	image.mv(path.resolve(__dirname,'..', 'public/posts', image.name),(error) => {
    		Post.create({
			...req.body, 
			content: contents, 
			tags: tags, 
			image: `${url_base}/posts/${image.name}`
		}, (error, post) => {
                		res.redirect('/');
                	});
        });	
};
