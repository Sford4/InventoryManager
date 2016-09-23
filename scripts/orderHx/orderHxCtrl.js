angular.module('inventoryManager')
	.controller('orderHxCtrl', ['OrderHxServ', 'AuthenServ', '$scope', '$localStorage', 'userHx', 'DashboardServ', function(OrderHxServ, AuthenServ, $scope, $localStorage, userHx, DashboardServ) {
		console.log("Yeah BOOOOOOYYYYY");

		var vm = this;

		vm.userHx = userHx;
		vm.sortType = 'date'; 
  		vm.reverse  = false; 
  		vm.searchHx = '';
  		vm.returnIt = returnIt;

  		console.log(userHx);


  		function returnIt(object){
  			object.type.description = 'Returned';
  			OrderHxServ.putTransaction(object);
  			for (var i = userHx.length - 1; i >= 0; i--) {
  				if(object === userHx[i]){
  					userHx.splice(i, 1);
  				}
  			}
  		};

}]);

