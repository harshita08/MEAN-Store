(function(){

	angular
		.module("myApp")
		.controller("productCtrl", productController);

		productController.$inject = ['productFactory', 'usersFactory', '$location'];

		function productController(productFactory, usersFactory, $location){
			var vm = this;
			vm.user = [];
			vm.newProduct = {};
			vm.addProduct = addProduct;

			
			getSession();

			function getSession () {
				usersFactory.getSession(function(factoryData){
					vm.user = factoryData.userInfo
				})
			}

			function addProduct(){
				productFactory.addProduct(vm.newProduct, function(data){
					vm.newProduct = {};
					if(data.status){
						$location.url('/');
					}
					else{
						$location.url('/newProduct');
					}
				})
			}


		}
})();
