angular.module('inventoryManager')
    .factory('AuthenServ', ['$http', '$q', '$localStorage', '$rootScope', function($http, $q, $localStorage, $rootScope) {

      var service =  {
        user: undefined,
        login: login,
        logout: logout,
        createUser: createUser,
        isLoggedIn: false,
        goodSignup: false
      };
      init();
      return service;

      function init(){
        if($localStorage.token){
          service.user = successAuth();
          service.isLoggedIn = true;
        }
      }

      function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }
// call this on app load
      function getClaimsFromToken() {
         var token = $localStorage.token;
         if (typeof token !== 'undefined') {
             var encoded = token.split('.')[1];
             var claims = JSON.parse(urlBase64Decode(encoded));
         }
         return claims;
      }

      function successAuth(res) {
        console.log('success - auth');
        if(res) $localStorage.token = res.data.token;
        service.user = getClaimsFromToken();
        $rootScope.$emit("authenticated", service.user);
        service.isLoggedIn = true;
        goodSignup = true;
        return service.user;
      }

      function login(object) {
        return $http.post("http://wta-inventorybackend.herokuapp.com/api/v1/login", object)
          .then(function(response){
            service.isLoggedIn = true;
            return successAuth(response);
          }, function(err){
            console.error(err);
          });
      }

      function createUser(object) {
        return $http.post("http://wta-inventorybackend.herokuapp.com/api/v1/signup", object)
          .then(function(response){
            return successAuth(response);
          })
      }

      function logout(){
        service.user = undefined;
        $localStorage.$reset();
        service.isLoggedIn = false;
      }



  }]);

    

    















