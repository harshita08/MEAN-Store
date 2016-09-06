(function(){

	angular
		.module("myApp")
		.factory("usersFactory", usersFactory);

		function usersFactory($http){
			var factory = {
				register: register,
				login: login,
				logout: logout,
				getSession: getSession
			}
			return factory;

			function getSession(callback){
				$http.get('/session')
				.success(function(returnData){
					callback(returnData);
				})
			}

			function register(newUser, callback){
				$http.post('/register', newUser)
				.success(function(user){
					callback(user);
				})
			}
			function login(logInfo, callback){
				$http.post('/login', logInfo)
				.success(function(returnData){
					callback(returnData);
				})
			}
			function logout(callback){
				$http.post('/logout')
				.success(function(returnData){
					callback(returnData);
				})
			}
		}

})();
