angular.module('inventoryManager')
	.controller('navbarCtrl',  ['$rootScope', 'AuthenServ',  function($rootScope, AuthenServ){
		console.log('navbarCtrl');
	//local variables
		var vm = this;

		//bound function
		vm.logout = logout;
		
		//bound values
		vm.user = AuthenServ.user === undefined ? {name:'Guest', role:'guest'} : AuthenServ.user;
		vm.loggedIn = AuthenServ.isLoggedIn;
		vm.role = vm.user.role;
		// vm.product = product[0];


		//bound function implementations

		
		$rootScope.$on("authenticated", function(event,data){
			vm.user = data;
			vm.loggedIn = true;
			vm.role = AuthenServ.user.role;
		});

		function logout(){
			AuthenServ.logout();
			resetUser();
			console.log(vm.loggedIn);
		}

		function resetUser(){
			vm.loggedIn = false;
		}
	}]);