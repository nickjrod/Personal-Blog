module.exports = (req, res) => {
	if (typeof req.session.userId === "undefined") {
		req.session.message = "Only Registered Users can make Posts";
		res.redirect('/auth/login');
		req.session.message = undefined;;
	} else {
		res.render('create');
	}
};
