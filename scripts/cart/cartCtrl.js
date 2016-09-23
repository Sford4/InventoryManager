angular.module('inventoryManager')
	.controller('cartCtrl', ['$uibModal', '$stateParams', '$localStorage', '$state', 'CartData', 'DashboardServ', function($uibModal, $stateParams, $localStorage, $state, CartData, DashboardServ){

	//local variables
		var vm = this;

		

		//bound function
		vm.saleOpen = saleOpen;
		vm.cartItems = CartData.purchases;
		vm.removeItem = removeItem;
		vm.post = post;

		console.log(vm.cartItems);

		//bound values
		


		//bound function implementations
		
		function saleOpen(theId){
			 var modalInstance = $uibModal.open({
		            templateUrl: 'templates/cart/purchase.html',
		            controller: "purchaseCtrl",
		            controllerAs: "purchase"
			})
		}

		function removeItem(obj){
			for (var i = vm.cartItems.subTransactions.length - 1; i >= 0; i--) {
				if(vm.cartItems.subTransactions[i] === obj){
					vm.cartItems.subTransactions.splice(i, 1);
				}
			}
		}

		function post(object){
			for(var i = 0; i < object.subTransactions.length; i++){
				delete object.subTransactions[i].details;
			}
			DashboardServ.postTransaction(object).then(function(){
	    		CartData.purchases.subTransactions = [];
				return response.data;
			});
	    }
	}]);
