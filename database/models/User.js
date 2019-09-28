const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		uniqure: true
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	}
})

UserSchema.pre('save', function(next) {
	const user = this;
	
	bcrypt.hash(user.password, 10, function(error, encrypted) {
		user.password = encrypted;
		next();
	});
});

module.exports = mongoose.model('User', UserSchema);
