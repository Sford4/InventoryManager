angular.module('inventoryManager')
	.controller('signupCtrl', ['$localStorage', 'SignupServ', 'AuthenServ', '$state', function($localStorage, SignupServ, AuthenServ, $state){

		//local variables
		var vm = this;
		vm.newUser = {
			email: null,
			password: null,
			fName: null,
			lName: null
		}
		vm.errorMsg = '';

		//bound function
		vm.createUser = createUser;
		vm.goodSignup = true;

		//bound values

		//bound function implementations
		function createUser(newUser){
			if(vm.newUser.email && vm.newUser.password && vm.newUser.fName && vm.newUser.lName){
				AuthenServ.createUser(newUser)
				.then(function(){
					$state.go('products');
				})
				.catch(function(err){
					console.log(err);
					vm.errorMsg = err.data.message;
					vm.goodSignup = false;
				})
			}
		}


	}]);