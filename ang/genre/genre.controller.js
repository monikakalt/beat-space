(function () {
    'use strict';

    angular.module('app').controller('GenreController', GenreController);

    GenreController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'UniversalService', '$scope'];
    function GenreController($location, AuthenticationService, FlashService, UniversalService, $scope) {
        var vm = this;

        vm.allgenres = [];

         $scope.currentSong = function(url) {
            $scope.PlayerUrl = $sce.trustAsResourceUrl(url + '?enablejsapi=1&modestbranding=1&showinfo=0&controls=0&autoplay=1');
        };


        loadAllGenres();

        $scope.loadArtists = function(genreId){
            UniversalService.UpdateGenreId(genreId);

        }

        function loadAllGenres() {  	
            UniversalService.GetAllGenres()
                .then(function (genre) {
                    vm.allgenres = genre.Results;
                    
                });
        }

    }

})();
