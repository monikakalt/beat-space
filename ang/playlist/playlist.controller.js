(function () {
    'use strict';

    angular.module('app').controller('PlaylistController', PlaylistController);

    PlaylistController.$inject = ['$location', 'AuthenticationService', '$rootScope', 'FlashService', 'UniversalService', '$scope', '$sce'];
    function PlaylistController($location, AuthenticationService, $rootScope, FlashService, UniversalService, $scope, $sce) {
        var vm = this;
        vm.OutsideLists = [];
        vm.songIdList = [];
        vm.shuffledSongIdList = [];
        var lengths = [];
        var names = [];
        var index = 0;
        vm.playlists = [];

        showAllPlayLists();
       


        $scope.currentSong = function(url, id, playlist) {
            debugger;
            vm.songIdList = [];
            vm.shuffledSongIdList = [];
            vm.currentId = id;

            if (url.indexOf("&") !=-1) {
                url = url.substr(0,url.indexOf('&'));
            }
            var video_id = url.split('v=')[1];
            var Url = "https://www.youtube.com/embed/" + video_id;
            var PlayerUrl = $sce.trustAsResourceUrl(Url + '?enablejsapi=1&modestbranding=1&showinfo=0&controls=0&autoplay=1&vq=hd1080&modestbranding=1&rel=0&iv_load_policy=3');
            
            for (var i = 0; i < vm.OutsideLists.length; i++) {
                if(vm.OutsideLists[i].Name == playlist){
                    for (var j = 0; j < vm.OutsideLists[i].Songs.length; j++) {
                        vm.songIdList.push(vm.OutsideLists[i].Songs[j]._id);
                        vm.shuffledSongIdList.push(vm.OutsideLists[i].Songs[j]._id);
                    }
                }
            }
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




        function showAllPlayLists() {
            
            UniversalService.GetPlaylistsByUserName($rootScope.User.currentUser.username).then(function (lists) {           
                for (var i = 0; i < lists.Results.length; i++) {
                    var playlist = []; 
                    for (var j = 0; j < lists.Results[i].Songs.length; j++) { 
                        UniversalService.GetOneSongById(lists.Results[i].Songs[j]).then(function (song) {
                            for (var i = 0; i < lists.Results.length; i++) {
                                var playlist = []; 
                                for (var j = 0; j < lists.Results[i].Songs.length; j++) { 
                                    if(lists.Results[i].Songs[j] == song.Results._id){
                                        var image = GetThumbnail(song.Results.Url);
                                        song.Results.ThumbNail = image;
                                        lists.Results[i].Songs[j] = song.Results;
                                    }
                                }                    
                            }
                            vm.OutsideLists = lists.Results;
                        });
                    }          
                }
            });                     
        }

        function GetThumbnail(url) {

            var youtube_video_id = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
            if (youtube_video_id.length == 11) {
                var imgSource = '//img.youtube.com/vi/'+youtube_video_id+'/0.jpg';
            }
            return imgSource;
        }


      }

})();
