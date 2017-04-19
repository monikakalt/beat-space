(function () {
    'use strict';

    angular.module('app').controller('SongController', SongController);

    SongController.$inject = ['$location', 'AuthenticationService', '$rootScope', 'FlashService', 'UniversalService', '$scope', '$sce'];
    function SongController($location, AuthenticationService, $rootScope, FlashService, UniversalService, $scope, $sce) {
        var vm = this;

        vm.allSongs = [];
        vm.songIdList = [];
        vm.shuffledSongIdList = [];
        vm.currentId = null;
        vm.shuffled = false;

        $scope.selectedList = null;
        $scope.options = [];

        $scope.loadArtists = function(genreId){
            UniversalService.UpdateGenreId(genreId);
        }

        loadAllSongs();
        
        function loadAllSongs() {   
            UniversalService.GetAllSongsByAlbumId().then(function (song) {         
                song.Results.forEach(function(entry) {
                    var image = GetThumbnail(entry.Url);
                    entry.ThumbNail = image
                    vm.songIdList.push(entry._id);
                    vm.shuffledSongIdList.push(entry._id);
                });
                var image = GetThumbnail(song.Results[0].Url);
                song.Results[0].ThumbNail = image;
                vm.allSongs = song.Results;         
            });
        }

        function GetThumbnail(url) {
            debugger;
            var youtube_video_id = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
            if (youtube_video_id.length == 11) {
                var imgSource = '//img.youtube.com/vi/'+youtube_video_id+'/0.jpg';
            }
            return imgSource;
        }
        $scope.currentSong = function(url, id) {
            vm.currentId = id;
            debugger;
                if (url.indexOf("&") !=-1) {
                    url = url.substr(0,url.indexOf('&'));
                }
                var video_id = url.split('v=')[1];
                var Url = "https://www.youtube.com/embed/" + video_id;
                var PlayerUrl = $sce.trustAsResourceUrl(Url + '?enablejsapi=1&modestbranding=1&showinfo=0&controls=0&autoplay=1&vq=hd1080&modestbranding=1&rel=0&iv_load_policy=3');
            $rootScope.globals = {
                Player: {
                    Url: PlayerUrl,
                    songIdList: vm.songIdList,
                    shuffledSongIdList: shuffle(vm.shuffledSongIdList),
                    currentId: id
                }
            };
            console.log($rootScope.globals.Player.Url);

            
        };
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
        return array;
        }
    }

})();
