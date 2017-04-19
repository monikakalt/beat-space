(function () {

    angular.module('app').factory('UniversalService', UniversalService);

    UniversalService.$inject = ['$http', '$q', '$location', 'FlashService'];
    function UniversalService($http, $q, $location, FlashService) {
        var service = {};
        var vm = this;

        service.GenreId = null;
        service.ArtistId = null;
        service.AlbumId = "58d2dd9ba07bdaf28485ac29";  

        
        service.UpdateGenreId = UpdateGenreId;
        service.UpdateArtistId = UpdateArtistId;
        service.UpdateAlbumId = UpdateAlbumId;
        service.GetAllGenres = GetAllGenres;
        service.GetAllArtistsByGenreId = GetAllArtistsByGenreId;
        service.GetAllAlbumsByArtistId = GetAllAlbumsByArtistId;
        service.GetAllSongsByAlbumId = GetAllSongsByAlbumId;
        service.GetOneSongById = GetOneSongById;
        service.AddToPlaylist = AddToPlaylist;
        service.GetPlaylistsByUserName = GetPlaylistsByUserName;
        service.GoToGenrebbz = GoToGenrebbz;
        service.PostSong = PostSong;
        service.SearchObject = SearchObject;

        

        return service;
        function GoToGenrebbz() {
            $location.path('/genre');
        }

        function UpdateGenreId(id) {
            service.GenreId = id;
            console.log(service.GenreId);
            $location.path('/artist');
        }

        function UpdateArtistId(id) {
            
            service.ArtistId = id;
            console.log(service.ArtistId);
            $location.path('/album');
        }

        function UpdateAlbumId(id) {
            service.AlbumId = id;
            console.log(service.AlbumId);
            $location.path('/');            // cia reiktu pakeist i /song
        }



        function GetAllGenres(){
        	debugger;
            var promise = $http.get('http://localhost:52281/allgenres/', {cache: false}).then(function(response){
            return response.data;
            });
        return promise;

        }
        function SearchObject(keyword)
        {
            var promise = $http.get('http://localhost:52281/search/' + keyword, {cache: false}).then(function(response){
            return response.data;
            });
        return promise;
        }

        function GetAllArtistsByGenreId(){

            console.log(service.GenreId);
            var promise = $http.get('http://localhost:52281/allartists/' + service.GenreId, {cache: false}).then(function(response){
            return response.data;
            });
        return promise;
        }

         function GetAllAlbumsByArtistId(){
            debugger;
            PostSong("dfadf");
            console.log(service.ArtistId);
            var promise = $http.get('http://localhost:52281/allalbums/' + service.ArtistId, {cache: false}).then(function(response){
            return response.data;
            });
        return promise;

        }

        function GetAllSongsByAlbumId(){

            var promise = $http.get('http://localhost:52281/allsongs/' + service.AlbumId, {cache: false}).then(function(response){
            return response.data;
            });
        return promise;

        }

        function GetOneSongById(id) {
            
            var promise = $http.get('http://localhost:52281/song/' + id, {cache: false}).then(function(response){
            return response.data;
            });
        return promise;
        }

        function PostSong(JSONObject) {

            $http.post('http://localhost:52281/song/', JSONObject).then();
        }




        function AddToPlaylist(playlist, songId) {

            var JSONObject= {  
                "Id":playlist,
                "SongId":songId
            };

            $http.post('http://localhost:52281/addtoplaylist/', JSONObject).then(handleSuccess("Success"), handleError('Error creating user'));
        }

        function GetPlaylistsByUserName(name) {
            
            var promise = $http.get('http://localhost:52281/playlistsbyowner/' + name, {cache: false}).then(function(response){
            return response.data;
            });
        return promise;
        }

        function GetVideoInfo(videoId){
            
        }
    }
})();
