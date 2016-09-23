angular.module('inventoryManager')
	.controller('buyModalCtrl',  ['$filter', 'product', 'DashboardServ', '$uibModalInstance', 'CartData',  function($filter, product, DashboardServ, $uibModalInstance, CartData){

		var vm = this;

		vm.hide = true;
		vm.sale = {
					id: product.id,
					qty: 1,
					details: {
						name: '',
						price: 0
					}
				}



		vm.product = product;



		vm.close = close;
		vm.sendToCart = sendToCart;
		vm.addOne = addOne;
		vm.subtractOne = subtractOne;


		function sendToCart(object){
			vm.sale.details.name = vm.product.name;
			vm.sale.details.price = vm.product.price;
			CartData.purchases.subTransactions.push(object);

		}

		function close(){
			$uibModalInstance.dismiss('cancel');
		}

		function addOne(){
			vm.sale.qty++;
		}

		function subtractOne(){
			vm.sale.qty--;
		}


	
}]);
