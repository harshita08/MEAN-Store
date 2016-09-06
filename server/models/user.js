var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Product = mongoose.model('Product');

var UserSchema = new mongoose.Schema({
	first_name: {
		type: String, 
		required: true, 
		minlength: 2, 
		maxlength: 256
	},
	last_name: {
		type: String, 
		required: true, 
		minlength: 2, 
		maxlength: 256
	},
	email: {
		type:String, 
		required: true, 
		minlength:10, 
		maxlength: 256, 
		unique: true
	},
	password: {
		type:String, 
		required: true, 
		minlength: 8, 
		maxlength: 256
	},
	// products that this user has listed..
	_products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	]
	
}, {timestamps: true})

UserSchema.methods.validPassword = function(enteredPassword){
	return bcrypt.compareSync(enteredPassword, this.password)
}

UserSchema.pre('save', function(next){
	var user = this
	bcrypt.genSalt(10, function(err,salt){
		if(err) console.log(err);
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) console.log(err);
			user.password = hash;
			next();
		});
	});
})

mongoose.model('User', UserSchema);
