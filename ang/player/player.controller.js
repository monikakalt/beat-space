(function () {
    'use strict';

    angular.module('app').controller('PlayerController', PlayerController);

    PlayerController.$inject = ['$location', 'AuthenticationService', '$rootScope', 'FlashService', 'UniversalService', '$scope', '$sce'];
    function PlayerController($location, AuthenticationService, $rootScope, FlashService, UniversalService, $scope, $sce) {
        var vm = this;

        vm.allSongs = [];
        vm.songIdList = [];
        vm.shuffledSongIdList = [];
        vm.currentId = null;
        vm.shuffled = false;

        $scope.selectedList = null;
        $scope.options = [];

        $scope.randomise = function(){
            if(!vm.shuffled){
                vm.shuffled = true;
                console.log("shufled")
            }
            else {
                vm.shuffled = false;
                console.log("not shuffled");
            }
        }

        $scope.addToPlaylist = function() {
            vm.currentId = $rootScope.globals.Player.currentId;
            UniversalService.AddToPlaylist($scope.selectedList, vm.currentId);
        }

        $scope.showAllPlayLists = function() {
            UniversalService.GetPlaylistsByUserName($rootScope.User.currentUser.username).then(function (lists) {
                $scope.options = lists.Results; // Ateina playlistai
             });
            
        }

        $scope.nextSong = function() {
            $scope.selectedList = null;
            $scope.options = [];
            vm.songIdList = $rootScope.globals.Player.songIdList;
            vm.shuffledSongIdList = $rootScope.globals.Player.shuffledSongIdList;
            vm.currentId = $rootScope.globals.Player.currentId;
            var i;
            var url;
            var next;
            if(!vm.shuffled) {
                for (i = 0; i < vm.songIdList.length; i++) { 
                    if(vm.songIdList[i] == vm.currentId) {
                        if(i == vm.songIdList.length-1){
                            i = 0;
                            next = vm.songIdList[i];
                            break;
                        }
                        else {
                            next = vm.songIdList[i+1];
                            break; 
                        }
                    }
                }
            }
            else {
                for (i = 0; i < vm.shuffledSongIdList.length; i++) { 
                    if(vm.shuffledSongIdList[i] == vm.currentId) {
                        if(i == vm.shuffledSongIdList.length-1){
                            i = 0;
                            next = vm.shuffledSongIdList[i];
                            break;
                        }
                        else {
                            next = vm.shuffledSongIdList[i+1];
                            break; 
                        }
                    }
                }
            }

            UniversalService.GetOneSongById(next).then(function (song) {
                debugger;
                vm.currentId = next;
                if (song.Results.Url.indexOf("&") !=-1) {
                    song.Results.Url = song.Results.Url.substr(0,song.Results.Url.indexOf('&'));
                }
                var video_id = song.Results.Url.split('v=')[1];
                var Url = "https://www.youtube.com/embed/" + video_id;
                var PlayerUrl = $sce.trustAsResourceUrl(Url + '?enablejsapi=1&modestbranding=1&showinfo=0&controls=0&autoplay=1&vq=hd1080&modestbranding=1&rel=0&iv_load_policy=3');
                $rootScope.globals = {
                Player: {
                    Url: PlayerUrl,
                    songIdList: vm.songIdList,
                    shuffledSongIdList: vm.shuffledSongIdList,
                    currentId: vm.currentId
                    }
                };
            });
        }

        $scope.passedSong = function() {
            vm.songIdList = $rootScope.globals.Player.songIdList;
            vm.shuffledSongIdList = $rootScope.globals.Player.shuffledSongIdList;
            vm.currentId = $rootScope.globals.Player.currentId;
            var i;
            var url;
            var passed;
     
            for (i = 0; i < vm.songIdList.length; i++) { 
                if(vm.songIdList[i] == vm.currentId) {
                    if(i == 0){
                        i = vm.songIdList.length;
                        passed = vm.songIdList[vm.songIdList.length-1];
                        break;
                    }
                    else {
                        passed = vm.songIdList[i-1];
                        break; 
                    }
                }
            }
            UniversalService.GetOneSongById(passed).then(function (song) {
                debugger;
                vm.currentId = passed;
                if (song.Results.Url.indexOf("&") !=-1) {
                    song.Results.Url = song.Results.Url.substr(0,song.Results.Url.indexOf('&'));
                }
                var video_id = song.Results.Url.split('v=')[1];
                var Url = "https://www.youtube.com/embed/" + video_id;
                var PlayerUrl = $sce.trustAsResourceUrl(Url + '?enablejsapi=1&modestbranding=1&showinfo=0&controls=0&autoplay=1&vq=hd1080&modestbranding=1&rel=0&iv_load_policy=3');
                $rootScope.globals = {
                    Player: {
                        Url: PlayerUrl,
                        songIdList: vm.songIdList,
                        shuffledSongIdList: vm.shuffledSongIdList,
                        currentId: vm.currentId
                    }
                };
            });
        }
        $scope.repeat = function()
        {
            UniversalService.GetOneSongById(vm.currentId).then(function (song) {
                debugger;

                if (song.Results.Url.indexOf("&") !=-1) {
                    song.Results.Url = song.Results.Url.substr(0,song.Results.Url.indexOf('&'));
                }
                var video_id = song.Results.Url.split('v=')[1];
                var Url = "https://www.youtube.com/embed/" + video_id;
                var PlayerUrl = $sce.trustAsResourceUrl(Url + '?enablejsapi=1&modestbranding=1&showinfo=0&controls=0&autoplay=1&vq=hd1080&modestbranding=1&rel=0&iv_load_policy=3');
                $rootScope.globals = {
                    Player: {
                        Url: PlayerUrl,
                        songIdList: vm.songIdList,
                        shuffledSongIdList: vm.shuffledSongIdList,
                        currentId: vm.currentId
                    }
                };
            });
        }
    }
})();
