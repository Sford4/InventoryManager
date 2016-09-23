angular.module('inventoryManager')
	.controller('productsCtrl', ['$uibModal', '$stateParams', '$localStorage', '$state', 'productList', 'ProductsData', 'AuthenServ',  function($uibModal, $stateParams, $localStorage, $state, productList, ProductsData, AuthenServ){

	//local variables
		var vm = this;
		

		//bound function
		
		//bound values
		vm.productList = productList;
		vm.goToDetail = goToDetail;
		vm.saleOpen = saleOpen;


		//bound function implementations
		
		function goToDetail(id){
			$state.go('details', {
				id: id
			});
		}
		
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


