const User = require('../database/models/User')

module.exports = (req, res, next) => {
	User.findById(req.session.userId, (error, user) => {
		console.log(user.username);
		if(error || user.username != 'Nick' || !user.username) {
			req.session.message = "Only Nick can post right now!";
			console.log(req.session.message);
			return res.redirect('/');
		}
		next()
	});
};
