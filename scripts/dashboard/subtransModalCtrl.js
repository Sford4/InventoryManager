angular.module('inventoryManager')
	.controller('subtransModalCtrl',  ['DashboardServ', 'specificTrans', '$uibModalInstance', '$filter',  function(DashboardServ, specificTrans, $uibModalInstance, $filter){

		var vm = this;

		vm.close = close;
		vm.specificTrans = specificTrans;

		function close(){
			$uibModalInstance.dismiss('cancel');
		}




}]);