(function () {

    angular.module('app').controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'AuthenticationService', 'FlashService', '$q'];
    function RegisterController(UserService, $location, $rootScope, AuthenticationService, FlashService, $q) {
        var vm = this;

        vm.register = register;

        function register() {      
            var coded_user = AuthenticationService.SetCredentials(vm.user.username, vm.user.password);
            var Results = UserService.Create(coded_user, vm.user);
            console.log("Ready? " + Results);
            debugger;
        }
    }

})();
