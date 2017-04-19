(function () {
   // 'use strict';

    angular
        .module('app')
        .controller('SongChoiceController', SongChoiceController);

    SongChoiceController.$inject = ['$location', 'AuthenticationService', '$rootScope', 'FlashService', 'UniversalService', '$scope', '$sce'];
    function SongChoiceController($location, AuthenticationService, $rootScope, FlashService, UniversalService, $scope, $sce) {
        var vm = this;

        vm.selectedGenre = null;
        vm.artist = null;
        vm.album = null;
        vm.Url = null;
        vm.title = null;
        vm.albumimg = null;
        vm.artistimg = null;  
        vm.allgenres = [];
        vm.submit = submit;
        
        loadAllGenres();
       

        function submit() {      
            debugger;
            if (vm.Url.indexOf("&") !=-1) {
                    vm.Url = vm.Url.substr(0,Url.indexOf('&'));
                }

            var JSONObject = {
                 "GenreId":vm.selectedGenre,
                 "ArtistName":$rootScope.artist,
                 "AlbumName":vm.album,
                 "SongName":$rootScope.title,
                 "Url":vm.Url,
                 "ArtistThumbNail":vm.artistimg,
                 "AlbumThumbNail":vm.albumimg,
                 "SongThumbNail":$rootScope.img
                 };

            var Results = UniversalService.PostSong(JSONObject);  // Should work but does not

        }


         function loadAllGenres() {     
            UniversalService.GetAllGenres()
                .then(function (genre) {
                    vm.allgenres = genre.Results;
                });
        }

    //    $scope.getTime = function(){
   //         return $scope.Dt = Date.now();
    //    }
        
        $scope.ArtistAndTitle = function(artist, title) {
            debugger;
            $rootScope.artist = artist;
            $rootScope.title = title;
        }

  //      $scope.SelectedImage = function(url) {
  //          $rootScope.img = url;
  //      }
        
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
