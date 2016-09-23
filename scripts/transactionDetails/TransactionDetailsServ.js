
angular.module('inventoryManager')
    .factory('TransactionDetailsServ', ['$http', '$q', '$localStorage', function($http, $q, $localStorage) {
    	service = {};

    	return service;
}]);




    

// http://wta-inventorybackend.herokuapp.com/api/v1/product/summary
// 	-get list of products with summaries of times ordered, times returned, total sales, total costs, total sold (minus refunds)

// http://wta-inventorybackend.herokuapp.com/api/v1/product/:prodId/transactions
// 	-get all transactions containing this product
