(function () {
    'use strict';

    var app = angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    // app.controller('NavController', NavController);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/', {
                controller: 'SongController',
                templateUrl: 'song/song.view.html',
                controllerAs: 'vm'
            })

            .when('/genre', {
                controller: 'GenreController',
                templateUrl: 'genre/genre.view.html',
                controllerAs: 'vm'
            })

            .when('/artist', {
                controller: 'ArtistController',
                templateUrl: 'artist/artist.view.html',
                controllerAs: 'vm'
            })

            .when('/album', {
                controller: 'AlbumController',
                templateUrl: 'album/album.view.html',
                controllerAs: 'vm'
            })
            .when('/playlist', {
                controller: 'PlaylistController',
                templateUrl: 'playlist/playlist.view.html',
                controllerAs: 'vm'
            })
            .when('/search', {
                controller: 'SearchController',
                templateUrl: 'search/search.view.html',

                controllerAs: 'vm'
            })
            .when('/song_choice', {
                controller: 'SongChoiceController',
                templateUrl: 'song_choice/song_choice.view.html',

                controllerAs: 'vm'
            })
           // .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.User = $cookies.getObject('globals') || {};
        if ($rootScope.User.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.User.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.User.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();