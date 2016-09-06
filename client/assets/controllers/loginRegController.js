(function(){

	angular
		.module("myApp")
		.controller("loginRegCtrl", loginRegController);

		loginRegController.$inject = ['usersFactory', '$location'];

		function loginRegController(usersFactory, $location){
			var vm = this;
			vm.newUser = {};
			vm.logInfo = {};
			vm.user = [];
			vm.register = register;
			vm.login = login;
			vm.errors = [];
			vm.logout = logout;
			vm.getSession = getSession;

			getSession()

			function getSession () {
				usersFactory.getSession(function(factoryData){
					vm.user = factoryData.userInfo
					if (!vm.user){
						$location.url('/login')
					}
				})
			}

			function register(){
				vm.errors = [];
				usersFactory.register(vm.newUser, function(data){
					if(data.status){
						vm.user = data.userInfo
						$location.url('/')
					} else{
						vm.errors = data.errors;
					}		
				}); 
			}

			function login(){
				vm.errors = [];
				usersFactory.login(vm.logInfo, function(data){
					if(data.status){
						vm.user = data.userInfo
						$location.url('/')
					} else{
						vm.errors = data.errors;
					}
				})
			}
			function logout(){
				usersFactory.logout(function(data){
					if(data.status){
						$location.url('/');
					} else {
						vm.errors = data.errors;
					}
				})
			}
		}

})();


