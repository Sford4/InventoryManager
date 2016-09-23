angular.module('inventoryManager')
    .factory('ProductsData', ['$http', '$q', function($http, $q) {
    	var service = {
    		getProducts: getProducts,
    		postProduct: postProduct,
            getOneProduct: getOneProduct,
            putProduct: putProduct,
            deleteProduct: deleteProduct
    	};

    	return service;

    	function getProducts() {
    		return $http.get("http://wta-inventorybackend.herokuapp.com/api/v1/product");
    	}

    	function postProduct(object) {
    		return $http.post("http://wta-inventorybackend.herokuapp.com/api/v1/product", object);
    	}

        function putProduct(object) {
            return $http.put("http://wta-inventorybackend.herokuapp.com/api/v1/product/" + object.id, object);
        }


        function deleteProduct(object) {
            return $http.delete("http://wta-inventorybackend.herokuapp.com/api/v1/product/" + object.id, object);
        }

        function getOneProduct(id){
            return $http.get("http://wta-inventorybackend.herokuapp.com/api/v1/product/" + id);
        }

}]);