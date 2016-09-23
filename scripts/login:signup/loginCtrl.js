angular.module('inventoryManager')
	.controller('loginCtrl', ['LoginServ', 'AuthenServ', '$scope', '$localStorage', '$sessionStorage', function(LoginServ, AuthenServ, $scope, $localStorage, $sessionStorage) {


		//local variables
		var vm = this;
		
		vm.previousUser = {
			email: null,
			password: null
		}
		//bound function
		vm.login = login;


		//bound values

		//bound function implementations
		function login(user){
			if(vm.previousUser.email && vm.previousUser.password){
				AuthenServ.login(user);
			}
		}
}]);