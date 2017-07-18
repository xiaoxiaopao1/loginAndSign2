const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/loginAndSign',{useMongoClient:true});

const userSchema = new mongoose.Schema({
	user: String,
	password: String
});
const User = mongoose.model('user',userSchema);

module.exports = User;