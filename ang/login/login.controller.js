(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            debugger;
            var coded_user = AuthenticationService.SetCredentials(vm.username, vm.password);

            AuthenticationService.Login(coded_user, function (response) {
                debugger;
                if (response.Result) {
                    AuthenticationService.Authorisation(vm.username, coded_user);
                    $location.path('/genre');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
