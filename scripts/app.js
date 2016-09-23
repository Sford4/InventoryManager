angular.module('inventoryManager', ["ui.router", "ngSanitize", "ngStorage", "validation.match", "ui.bootstrap"])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/products');

	$stateProvider
	.state("login", {
		url: "/login",
		templateUrl: "templates/login:signup/login.html",
		controller: "loginCtrl",
		controllerAs: "login",
	})

	.state("signup", {
		url: "/signup",
		templateUrl: "templates/login:signup/signup.html",
		controller: "signupCtrl",
		controllerAs: "signup",
	})

	.state("products", {
		url: "/products",
		templateUrl: "templates/products:details/products.html",
		controller: "productsCtrl",
		controllerAs: "products",	
		resolve: {
			productList: function(ProductsData){
				console.log("hello");
				return ProductsData.getProducts().then(function(response) {
					console.log('response', response.data);
	            	return response.data;
				});
			}
		}
	})

	.state("details", {
		url: "/details/:id",
		templateUrl: "templates/products:details/details.html",
		controller: "detailsCtrl",
		controllerAs: "details",	
		resolve: {
			product: function($stateParams, ProductsData){
				return ProductsData.getOneProduct($stateParams.id)
					.then(function(response){
						return response.data;
				});
			}
		}
	})

	.state("dashboard", {
		url: "/dashboard",
		templateUrl: "templates/dashboard/dashboard.html",
		controller: "dashboardCtrl",
		controllerAs: "dash",
		resolve: {
			isAdmin: function(AuthenServ, $state){
				if(AuthenServ.user.role !== "admin"){
					$state.go('products');
				}
			},
			productList: function(ProductsData){
				console.log("hello");
				return ProductsData.getProducts().then(function(response) {
					console.log('response', response.data);
	            	return response.data;
				});
			},
			transactionList: function(DashboardServ){
				return DashboardServ.getTransactions().then(function(response) {
					console.log('response', response.data);
					return response.data;
				});
			}
		}
	})

	.state("adminProducts", {
		url: "/adminProducts",
		templateUrl: "templates/admin/adminProducts.html",
		controller: "adminProductsCtrl",
		controllerAs: "adminProd",
		resolve: {
			isAdmin: function(AuthenServ, $state){
				if(AuthenServ.user.role !== "admin"){
						$state.go('products');
				}
			}
		}
	})

	.state("cart", {
		url: "/cart",
		templateUrl: "templates/cart/cart.html",
		controller: "cartCtrl",
		controllerAs: "cart",
		resolve: {
			isUser: function(AuthenServ, $state){
	    		console.log(AuthenServ.user.role);
				if(AuthenServ.user.role !== "admin" || "user"){
						$state.go('products');
				}
			}
		}
	})

	.state("orderHx", {
		url: "/orderHx",
		templateUrl: "templates/orderHx/orderHx.html",
		controller: "orderHxCtrl",
		controllerAs: "Hx",
		resolve: {
			userHx: function(OrderHxServ, AuthenServ){ 
				console.log('the resolve');
				return OrderHxServ.getHx(AuthenServ.userClaim) 
    				.then(function(response){
    				return response.data;
	    			})
	    	},
	    	isUser: function(AuthenServ, $state){
	    		console.log(AuthenServ.user.role);
				if(AuthenServ.user.role !== "admin" || "user"){
						$state.go('products');
				}
			}
		}
	})
	
	.state("transactionDetails", {
		url: "/transactionDetails",
		templateUrl: "templates/admin/transactionDetails.html",
		controller: "transactionDetailsCtrl",
		controllerAs: "transDetes",
		resolve: {
			isAdmin: function(AuthenServ, $state){
				if(AuthenServ.user.role !== "admin"){
						$state.go('products');
				}
			}
		}
	})
})

.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
		return {
			'request': function (config) {
			config.headers = config.headers || {};
			if ($localStorage.token) {
				config.headers.Authorization = $localStorage.token;
				config.headers['Access-Control-Allow-Origin'] = '*';
				config.headers['Content-Type'] = 'application/json';
			}
			return config;
			},
			'responseError': function (response) {
				if(response.status === 401){
					delete $localStorage.token;
					$location.path('/login'); //YOU MIGHT WANT TO CHANGE THIS ROUTE
				}
				return $q.reject(response);
			}
		};
	}]);
}])

.run(['$rootScope', function($rootScope) {
// 	// $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
// 	// 	console.log('$stateChangeStart');
// 	// 	console.log('event', event);
// 	// 	console.log('toState', toState);
// 	// });

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		console.log('$stateChangeError');

		console.log('event', event);
		console.log('toState', toState);
		console.log('error', error);
	});

// 	// $rootScope.$on('$stateNotFound', function(event, toState, toParams, fromState, fromParams) {
// 	// 	console.log('$stateNotFound');

// 	// 	console.log('event', event);
// 	// 	console.log('toState', toState);
// 	// });
}])



// angular.module('myapp')
//   .config(function($stateProvider) {
//       $stateProvider
//         .state('home', {
//           url: '/',
//           templateUrl: 'views/home.html',
//           resolve: {
//             user: function($auth) {
//               return $auth.getUser();
//             }
//           }
//         });
//     });


// $stateChangeError

































