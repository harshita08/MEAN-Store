(function(){

	angular
		.module("myApp")
		.controller("listingsCtrl", ListingsController);

		ListingsController.$inject = ['productFactory', 'usersFactory' , '$location', '$routeParams'];

		function ListingsController(productFactory, usersFactory, $location, $routeParams){
			var vm = this;
			vm.allProducts = [];
			vm.oneProduct = {};
			vm.prod = {};
			vm.deleteProduct = deleteProduct;
			vm.getOneProduct = getOneProduct;
			vm.editProduct = editProduct;

			if($routeParams.id){
				getSession();
				getOneProduct($routeParams.id);
			}
			else if(!$routeParams.id){
				getProductsListing();
			}
			

			function getSession () {
				usersFactory.getSession(function(factoryData){
					vm.user = factoryData.userInfo
				})
			}

			function getProductsListing(){
				getSession();
				productFactory.getProductsListing(function(data){
					vm.allProducts = data;
					vm.prod = vm.allProducts[0];
				})
			}

			function deleteProduct(index){
				productFactory.deleteProduct(index, function(data){
					vm.allProducts = data;
				});
			}

			function getOneProduct(index){
				productFactory.getOneProduct(index, function(data){
					vm.oneProduct = data;
				})
			}

			function editProduct(index){
				productFactory.editProduct(index, vm.prod, function(data){
					vm.allProducts = data;
					$location.url('/listings');
				})
			}

		}
})();

