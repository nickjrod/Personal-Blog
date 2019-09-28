module.exports = (req, res) => {
	var message = {message: req.session.message, val: (req.session.message != undefined)};
	console.log(message);
	res.render('login', {message});
	req.session.message = undefined;
}
