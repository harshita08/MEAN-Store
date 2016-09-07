(function(){

	angular
		.module("myApp")
		.controller("showProductCtrl", ShowProductController);

		ShowProductController.$inject = ['productFactory', 'usersFactory', 'cartFactory' , '$location', '$routeParams'];

		function ShowProductController(productFactory, usersFactory, cartFactory, $location, $routeParams){
			var vm = this;
			vm.user = [];
			vm.allProducts = [];
			vm.oneProduct = {};
			vm.getOneProduct = getOneProduct;
			vm.setOneProduct = setOneProduct;
			vm.addToCart = addToCart;
			vm.logout = logout;

			if($routeParams.id){
				getSession();
				getOneProduct($routeParams.id);
			}
			else if(!$routeParams.id){
				getProducts();
			}
			
			function getSession () {
				usersFactory.getSession(function(factoryData){
					vm.user = factoryData.userInfo
				})
			}

			function getProducts(){
				getSession();
				productFactory.getProducts(function(productData){
					vm.allProducts = productData;
				})
			}

			function getOneProduct(index){
				productFactory.getOneProduct(index, setOneProduct);
			}
			function setOneProduct(returnData){
				vm.oneProduct = returnData;

			}

			function addToCart(index){
				cartFactory.addToCart(index, vm.newQty, function(returnData){
					if(returnData.status){
						$location.url('/cart');
					} else {
						console.log("error occured");
					}
				})
			}

			function logout(){
				usersFactory.logout(function(data){
					if(data.status){
						$location.url('/login');
					} else {
						vm.errors = data.errors;
					}
				})
			}

		}
})();
