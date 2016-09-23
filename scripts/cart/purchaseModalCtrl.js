angular.module('inventoryManager')
	.controller('cartCtrl', ['$uibModal', '$stateParams', '$localStorage', '$state', 'CartData', function($uibModal, $stateParams, $localStorage, $state, CartData){

	//local variables
		var vm = this;

		

		//bound function
		vm.post = post;
		vm.cartItems = CartData.service.purchases;

		//bound values
		


		//bound function implementations
		
		function post(object){
			object.subTransactions[0].id = Number(object.subTransactions[0].id);
			object.subTransactions[0].qty = Number(object.subTransactions[0].qty);
			CartData.postTransaction(object).then(function(response) {
					console.log('response', response.data);
	            	return response.data;
			})
		}
		
		function saleOpen(theId){
			 var modalInstance = $uibModal.open({
		            templateUrl: 'templates/cart/purchase.html',
		            controller: "purchaseCtrl",
		            controllerAs: "purchase",
		            resolve: {
		            	product: function(ProductsData){
		            		return ProductsData.getOneProduct(theId).then(function(response) {
		            		console.log('response', response.data[0]);
	            			return response.data[0];
		            		});
		            	}
		        	}
			})
		}


	}]);