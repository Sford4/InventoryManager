angular.module('inventoryManager')
	.controller('dashModalProductTransCtrl',  ['productTrans', 'DashboardServ', '$uibModalInstance',  function(productTrans, DashboardServ, $uibModalInstance){

		var vm = this;

	

		vm.productTrans = productTrans;

		vm.close = close;



		function close(){
			$uibModalInstance.dismiss('cancel');
		}


	
}]);

