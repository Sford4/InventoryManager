angular.module('inventoryManager')
	.controller('newProdModalCtrl',  ['ProductsData', '$uibModalInstance', "$http", function(ProductsData, $uibModalInstance, $http){

		var vm = this;

		vm.close = close;

		vm.newProd = {
			amt: '',
			cost: '',
			description: '',
			imgThumbnail: '',
			name: '',
			price: ''
		}

		vm.post = post;
		vm.putProduct = putProduct;

		function post(object){
			object.amt = Number(object.amt);
			ProductsData.postProduct(object).then(function(response) {
					console.log('response', response.data);
	            	return response.data;
			})
		}


		function putProduct(object) {
            return $http.put("http://wta-inventorybackend.herokuapp.com/api/v1/product/" + object.id, object);
        }

        function close(){
			$uibModalInstance.dismiss('cancel');
		}

		
	
}]);


	