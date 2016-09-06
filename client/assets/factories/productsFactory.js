(function(){

	angular
		.module("myApp")
		.factory("productFactory", productFactory);

		function productFactory($http){
			var factory = {
				addProduct: addProduct,
				getProducts: getProducts,
				getOneProduct: getOneProduct,
				getProductsListing: getProductsListing,
				deleteProduct: deleteProduct,
				editProduct: editProduct,
			};
			return factory;		

			function addProduct(newProduct, callback){
				$http.post('/products', newProduct)
				.success(function(data){
					callback(data);
				})
			}

			function getProducts(callback){
				$http.get('/products')
				.success(function(productData){
					callback(productData);
				})
			}
	
			function getOneProduct(index, callback){
				$http.get('/products/' + index)
				.success(function(returnData){
					callback(returnData);
				})
			}

			function getProductsListing(callback){
				$http.get('/listings')
				.success(function(returnData){
					callback(returnData);
				})
			}

			function deleteProduct(index, callback){
				$http.delete('/product/' + index)
				.success(function(returnData){
					callback(returnData);
				})
			}

			function editProduct(index, updateProd, callback){
				$http.put('/products/' + index, updateProd)
				.success(function(returnData){
					callback(returnData);
				})
			}

	}
})();
