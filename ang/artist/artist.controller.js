(function () {
    'use strict';

    angular.module('app').controller('ArtistController', ArtistController);

    ArtistController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UniversalService', '$scope'];
    function ArtistController($location, AuthenticationService, FlashService, UniversalService, $scope) {
        var vm = this;

        vm.allartists = [];
         

        $scope.loadAlbums = function(artistId){
            debugger;
            UniversalService.UpdateArtistId(artistId);

        }


        loadAllArtists();

        function loadAllArtists() {  	
           
            debugger;
            vm.allartists = null;
            UniversalService.GetAllArtistsByGenreId()
                .then(function (artist) {
                    debugger;
                    vm.allartists = artist.Results;
                    
              });
        }

    }

})();
