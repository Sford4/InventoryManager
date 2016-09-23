angular.module('inventoryManager')
	.controller('newTransModalCtrl',  ['DashboardServ', '$uibModalInstance', '$filter',  function(DashboardServ, $uibModalInstance, $filter){

		var vm = this;

		vm.close = close;
		vm.post = post;
		vm.getDatetime = $filter('date')((new Date()), 'yyyy-mm-dd');
		vm.newTrans = {
			date: vm.getDatetime,
			notes: '',
			totalAmt: '',
			totalCost: '',
			totalPrice: '',
			type: {
				description: '',
				id: ''
			}
		}

		function post(object){
			object.type.id = Number(object.type.id);
			DashboardServ.postTransaction(object).then(function(response) {
					console.log('response', response.data);
	            	return response.data;
			})
		}

		function close(){
			$uibModalInstance.dismiss('cancel');
		}




}]);