(function () {
    'use strict';

    angular.module('app').controller('AlbumController', AlbumController);

    AlbumController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UniversalService', '$scope'];
    function AlbumController($location, AuthenticationService, FlashService, UniversalService, $scope) {
        var vm = this;

        vm.allalbums = [];
         

        $scope.loadSongs = function(albumId){
            debugger;
            UniversalService.UpdateAlbumId(albumId);

        }



        loadAllAlbums();

        function loadAllAlbums() {     
           debugger;
            vm.allalbums = null;
            UniversalService.GetAllAlbumsByArtistId()
                .then(function (album) {
                    debugger;
                    vm.allalbums = album.Results;
                    
              });
        }

    }

})();
