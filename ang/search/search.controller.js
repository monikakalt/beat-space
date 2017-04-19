(function () {
   // 'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$location', 'AuthenticationService', '$rootScope', 'FlashService', 'UniversalService', '$scope', '$sce'];
    function SearchController($location, AuthenticationService, $rootScope, FlashService, UniversalService, $scope, $sce) {
        var vm = this;

        vm.selectedGenre = null;
        vm.Keyword = null;
        vm.search = search;
        vm.Artists = [];
        vm.Albums = [];
        vm.Songs = [];
        
        loadAllGenres();
       

        function search() {    

            debugger;
            var Results = UniversalService.SearchObject(vm.Keyword).then(function (object) { 
                debugger;
                console.log(object.Results);
               
                  vm.Artists = object.Results[0];                
                  vm.Albums = object.Results[1];                             
                  vm.Songs = object.Results[2];
                
            });
        }


        function loadAllGenres() {     
            UniversalService.GetAllGenres()
                .then(function (genre) {
                    vm.allgenres = genre.Results;
                });
        }

        $scope.GetThumbnail = function(Url) {
            debugger;
            if(Url != null){
              if (Url.indexOf("&") !=-1) {
                    Url = Url.substr(0,Url.indexOf('&'));
                }
                var video_id = Url.split('v=')[1];
                if (video_id.length == 11) {
                    var imgSource = '//img.youtube.com/vi/'+video_id+'/0.jpg';
                    $rootScope.img = imgSource;
                }
            }
            
            return $rootScope.img;
        }
    }    
})();
