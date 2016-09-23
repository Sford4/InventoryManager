
angular.module('inventoryManager')
    .factory('DashboardServ', ['$http', '$q', '$localStorage', function($http, $q, $localStorage) {
    	var service = {
    		getTransactions: getTransactions,
    		postTransaction: postTransaction,
    		putTransaction: putTransaction,
    		getSpecificTransaction: getSpecificTransaction,
    		getTransForProduct: getTransForProduct
    	};

    	return service;


    	function getTransactions() {
    		return $http.get("http://wta-inventorybackend.herokuapp.com/api/v1/transaction");
    	}

    	function postTransaction(object) {
    		return $http.post("http://wta-inventorybackend.herokuapp.com/api/v1/transaction", object);
    	}

        function putTransaction(object) {
            return $http.put("http://wta-inventorybackend.herokuapp.com/api/v1/transaction/" + object.id, object);
        }

        function getSpecificTransaction(object) {
        	return $http.get("http://wta-inventorybackend.herokuapp.com/api/v1/transaction/" + object.id);
        }

        function getTransForProduct(object) {
        	return $http.get("http://wta-inventorybackend.herokuapp.com/api/v1/product/" + object.id + "/transactions");
        }

}]);


