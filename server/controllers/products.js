var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');

module.exports = {
	index: function(req,res){
		Product.find({}, function(err, products){
			if(err){
				console.log("Error encountered..");
				res.json(err);
			} else{
				res.json(products);
			}
		})
	},

	create: function(req,res){
		var product = new Product(req.body);
		product._user = req.session.userInfo.id;
		product.save(function(err){
			if(err){
				res.json({status: false});
			} else {
			User.findOne({_id: req.session.userInfo.id}, function(err, user){
				if(err){
					res.json({status: false});
				} else {
					user._products.push(product);
					user.save();
					res.json({status: true});
				}
			});
		}
		});
	},

	findOne: function(req,res){
		Product.findOne({_id: req.params.id}, function(err, prod){
			if(err){
				res.json(err);
			} else{
				res.json(prod);
			}
		})
	},

	myListings: function(req,res){
		Product.find({_user: req.session.userInfo.id}, function(err, products){
			if(err){
				console.log("Error encountered..");
			} else{
				res.json(products);
			}
		})
	},

	delete: function(req,res){
		Product.remove({_id: req.params.id}, function(err){
			if(err){
				console.log("Error encountered.......!!!");
			} else {
				Product.find({_user: req.session.userInfo.id}, function(err, products){
					if(err){
						res.json(err);
					} else{
						res.json(products);
					}
				})
			}
		})
	},

	update: function(req,res){
		Product.findOne({_id: req.params.id}, function(err, product){
			if(err){
				console.log("Product not found");
			} else{
				if(req.body.product_name)
					product.product_name = req.body.product_name;
				if(req.body.description)
					product.description = req.body.description;
				if(req.body.quantity)
					product.quantity = req.body.quantity;
				if(req.body.price)
					product.price = req.body.price;
				if(req.body.imageUrl)
					product.imageUrl = req.body.imageUrl;
				product.save(function(err){
					if(err){
						console.log("Product could not be saved!");
					} else {
						Product.find({}, function(err, products){
							if(err){
								console.log("Error encountered..");
							}else{
								res.json(products);
							}
						});
					}
				});
			}
		});
	},

	getRecommendations: function(req,res){
		Product.find({category: req.body.category}, function(err, products){
			if(err){
				console.log("Recommended products not found!");
			} else {
				res.json(products);
			}
		})
	}
}
