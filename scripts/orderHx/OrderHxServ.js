
angular.module('inventoryManager')
    .factory('OrderHxServ', ['$http', '$q', '$localStorage', 'AuthenServ', function($http, $q, $localStorage, AuthenServ) {
    	var service = {
    		getHx: getHx,
    		putTransaction: putTransaction
    	};


    	return service;



    	function getHx(user) {
    		return $http.get("http://wta-inventorybackend.herokuapp.com/api/v1/user/orders", user)
    		console.log(response);
    	}

    	function putTransaction(object) {
            return $http.put("http://wta-inventorybackend.herokuapp.com/api/v1/transaction/" + object.id, object);
        }

}]);