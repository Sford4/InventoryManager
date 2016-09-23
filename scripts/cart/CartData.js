angular.module('inventoryManager')
    .factory('CartData', ['$http', '$q', '$filter', function($http, $q, $filter) {
    	var service = {
    		postTransaction: postTransaction,
    		purchases: {
    			type: {
					id: 1,
					description: 'sale'
				},
				date: $filter('date')(new Date(), 'yyyy-MM-dd'),
				note: '',
				altersId: null,
				subTransactions: []
			}
		}




    	return service;



        function postTransaction(object) {
            return $http.post("http://wta-inventorybackend.herokuapp.com/api/v1/transaction", object);
        }
}]);

