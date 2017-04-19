(function () {

    angular.module('app').factory('UserService', UserService);

    UserService.$inject = ['$http', '$q', '$location', 'FlashService'];
    function UserService($http, $q, $location, FlashService) {
        var service = {};

        var vm = this;

        var ReadyToLogin = false;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;

        return service;


        function GetUserSearch(credentials, user) {
            var JSONObject= {
             "UserName":user.username,
             "Credentials":credentials
             };

            var promise = $http.get('http://localhost:52281/usersearch/' + user.username, {cache: false}).then(function(response){
            
            if(response.data.Result){
                debugger;
                FlashService.Error("Username already exists");
                $location.path('/register');
                ReadyToLogin = false;
                debugger;
            }
            else{
                $http.post('http://localhost:52281/users/', JSONObject).then(handleSuccess("Success"), handleError('Error creating user'));
                ReadyToLogin = true;
                $location.path('/');
                debugger;
          
            }
            return response.data;
            });
        return promise;
        }


         function Create(credentials, user) {
            var UserCheck = GetUserSearch(credentials, user);

            return ReadyToLogin; 
        }

        function GetByUsername(username) {
            debugger;
            var promise = $http.get('http://localhost:52281/usersbyname/' + username, {cache: false}).then(function(response){             
                
                return response.data;
            });
        return promise;
        }

        function GetByCredentials(credentials) {
            var promise = $http.get('http://localhost:52281/credentials/' + credentials, {cache: false}).then(function(response){
                return response.data;
                });
            return promise;
        }  

        function GetById(id) {
            return $http.get('/api/usersbyid/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function handleSuccess(msg) {
            return function () {
                return { success: true, message: msg };
            };
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error }; // Čia reik false padaryt
            };
        }
    }

})();
