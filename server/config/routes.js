var mongoose = require('mongoose');
var products = require('../controllers/products.js');
var users = require('../controllers/users.js');
var carts = require('../controllers/carts.js');

module.exports = function(app){

// Routes for login and Registration
	app.post('/register', function(req,res){
		users.register(req,res);
	})
	app.post('/login', function(req,res){
		users.login(req,res);
	})
	app.post('/logout', function(req,res){
		users.logout(req,res);
	})
	app.get('/session', function(req,res){
		users.session(req,res);
	})

// Other routes
	app.post('/products', function(req,res){
		products.create(req,res);
	})
	app.get('/products', function(req,res){
		products.index(req,res);
	})
	app.get('/products/:id', function(req,res){
		products.findOne(req,res);
	})
	app.get('/listings', function(req,res){
		products.myListings(req,res);
	})
	app.delete('/product/:id', function(req,res){
		products.delete(req,res);
	})
	app.put('/products/:id', function(req,res){
		products.update(req,res);
	})

// Route to handle cart
	app.post('/cart/:id', function(req,res){
		carts.addProduct(req,res);
	})
	app.get('/cart', function(req,res){
		carts.displayCart(req,res);
	})
	app.delete('/cart/:id', function(req,res){
		carts.deleteProductFromCart(req,res);
	})
	app.get('/checkout', function(req,res){
		carts.checkOut(req,res);
	})
}