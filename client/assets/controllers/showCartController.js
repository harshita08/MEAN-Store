(function(){

	angular
		.module("myApp")
		.controller("showCartCtrl", showCartController);

		showCartController.$inject = ['cartFactory', 'usersFactory', '$location'];

		function showCartController(cartFactory, usersFactory, $location){
			var vm = this;
			vm.allProducts = [];
			vm.deleteProductFromCart = deleteProductFromCart;
			vm.checkOut = checkOut;
			vm.prod = {};
			vm.val = {};

			displayCart();
			
			function getSession () {
				usersFactory.getSession(function(factoryData){
					vm.user = factoryData.userInfo
				});
			}

			function displayCart(){
				getSession();
				cartFactory.displayCart(function(cartData){
					if(cartData){
						vm.allProducts = cartData;
						vm.oneProduct = vm.allProducts[0];
						var value = 0;
						for(var i=0; i<vm.allProducts.length; i++){
							var total = vm.allProducts[i].product_price * vm.allProducts[i].product_quantity;
							vm.allProducts[i].total = total;
							value = value + total;
						}
						vm.val = {value:value};
					} else{
						vm.flag = 0;
					}
				})
			}

			function deleteProductFromCart(index){
				cartFactory.deleteProductFromCart(index, function(returnData){
					vm.allProducts = returnData;
				})
			}

			function checkOut(){
				cartFactory.checkOut(function(){
					$location.url('/orderPlaced');
				})
			}

		}
})();

