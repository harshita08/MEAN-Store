(function(){

	angular
		.module("myApp")
		.factory("cartFactory", cartFactory);

		function cartFactory($http){
			var factory = {
				addToCart: addToCart,
				displayCart: displayCart,
				deleteProductFromCart: deleteProductFromCart,
				checkOut: checkOut,
			};
			return factory;

			function addToCart(index, newQty, callback){
				$http.post('/cart/' + index, {qty: newQty})
				.success(function(returnData){
					callback(returnData);
				})
			}

			function displayCart(callback){
				$http.get('/cart')
				.success(function(cartData){
					callback(cartData);
				})
			}

			function deleteProductFromCart(index, callback){
				$http.delete('/cart/' + index)
				.success(function(returnData){
					callback(returnData);
				})
			}

			function checkOut(callback){
				$http.get('/checkout')
				.success(function(){
					callback();
				})
			}

		}
})();
