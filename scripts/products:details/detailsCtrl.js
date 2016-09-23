angular.module('inventoryManager')
	.controller('detailsCtrl', ['product', 'ProductsData', '$uibModal', function(product, ProductsData, $uibModal){

	//local variables
		var vm = this;
		
		//bound function
		vm.saleOpen = saleOpen;
		
		//bound values
		vm.product = product[0];

		//bound function implementations
		
		function saleOpen(theId){
			 var modalInstance = $uibModal.open({
		            templateUrl: 'templates/products:details/buyModal.html',
		            controller: "buyModalCtrl",
		            controllerAs: "sale",
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