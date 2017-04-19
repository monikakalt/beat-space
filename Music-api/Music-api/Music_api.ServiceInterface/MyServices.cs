using Music_api.ServiceModel.Models;
using Music_api.ServiceModel.UnitOfWork;
using System.Linq;
using Music_api.ServiceModel.DTOs;
using ServiceStack.ServiceInterface;
using System;
using System.Collections.Generic;
using System.Collections;

namespace Music_api.ServiceInterface
{

    public class MyServices : Service
    {
        private readonly UnitOfWork _sUnitOfwork;
        public MyServices()
        {
            _sUnitOfwork = new UnitOfWork();
        }

        public object Get(ObjectSearch request)
        {
            var Artists = _sUnitOfwork.Artists.SearchDatabase(request.KeyWord);
            var Albums = _sUnitOfwork.Albums.SearchDatabase(request.KeyWord);
            var Songs = _sUnitOfwork.Songs.SearchDatabase(request.KeyWord);

            List<IList> result = new List<IList>();
            result.Add(Artists);
            result.Add(Albums);
            result.Add(Songs);

            _sUnitOfwork.Songs.SearchDatabase(request.KeyWord);

            return new DbSearchResponse { Results = result };
         
        }

        public void Post(CreateUser request)
        {
            _sUnitOfwork.Users.Add(new User { UserName = request.UserName, Email = request.Email, Password = request.Password, Credentials = request.Credentials });
        }

        public object Post(CheckCredentials request)
        {
            var user = _sUnitOfwork.Users.Credentials(request.Credentials);

            if (user == null)
                return new SearchResponse { Result = false }; // Kai nesutampa credentials vadinasi tokio userio nėra arba klaidingai įvedė
            else
                return new SearchResponse { Result = true };

        }
        public object Get(GetUserByUserName request)
        {
            var user = _sUnitOfwork.Users.Get(request.UserName);

            return new UserResponse { Result = user };
        }
        public object Get(SearchForUser request)
        {
            var user = _sUnitOfwork.Users.Get(request.UserName);

            if (user == null)
                return new SearchResponse { Result = false };
            else
                return new SearchResponse { Result = true };
        }
     
        // Genres *********************
        public object Get(GetGenres request)
        {
            var tst = _sUnitOfwork.Genres.GetAll();
            var list = tst.ToList();

            return new GetGenreResponse { Results = list };
        }

        // Artists *********************
        public object Get(GetArtists request)
        {
            var fieldName = request.GetType().GetProperties()[0].Name.ToString();
            var tst = _sUnitOfwork.Artists.GetAll(request.GenreId, fieldName);
            var list = tst.ToList();

            return new GetArtistResponse { Results = list };
        }

        // Albums ********************
        public object Get(GetAlbum request)
        {
            var fieldName = request.GetType().GetProperties()[0].Name.ToString();
            var tst = _sUnitOfwork.Albums.GetAll(request.ArtistId, fieldName);
            var list = tst.ToList();

            return new GetAlbumResponse { Results = list };
        }

        // SONGS   **********************

        public object Get(GetSong request)
        {
            var tst = _sUnitOfwork.Songs.GetById(request.Id);

            return new GetSongResponse() { Results = tst };
        }
        public object Get(GetSongs request)
        {
            var fieldName = request.GetType().GetProperties()[0].Name.ToString();
            var tst = _sUnitOfwork.Songs.GetAll(request.AlbumId, fieldName);
            var list = tst.ToList();

            return new GetManySongsResponse { Results = list };
        }

        public void Post(PostSong request)
        {
            var Artists = _sUnitOfwork.Artists.GetAll(request.ArtistName, "Name");
            var Albums = _sUnitOfwork.Albums.GetAll(request.AlbumName, "Name");
            var Songs = _sUnitOfwork.Songs.GetAll(request.SongName, "Name");
            if (Artists.Count == 0)
            {
                _sUnitOfwork.Artists.Add(new Artist { GenreId = request.GenreId, Name = request.ArtistName, Views = 0, ThumbNail = request.ArtistThumbNail });
                var newartist = _sUnitOfwork.Artists.GetAll(request.ArtistName, "Name");
                _sUnitOfwork.Albums.Add(new Album { GenreId = request.GenreId, ArtistId = newartist[0]._id, Name = request.AlbumName, Views = 0, ThumbNail = request.AlbumThumbNail});
                var newalbum = _sUnitOfwork.Albums.GetAll(request.AlbumName, "Name");
                _sUnitOfwork.Songs.Add(new Song { GenreId = request.GenreId, ArtistId = newartist[0]._id, AlbumId = newalbum[0]._id, Name = request.SongName, Views = 0, ThumbNail = request.SongThumbNail, Published = false, Url = request.Url, UploadDate = DateTime.Now, ArtistName =request.ArtistName });

            }
            else if(Albums.Count == 0)
            {
                _sUnitOfwork.Albums.Add(new Album { GenreId = request.GenreId, ArtistId = Artists[0]._id, Name = request.AlbumName, Views = 0, ThumbNail = request.AlbumThumbNail });
                var newalbum = _sUnitOfwork.Albums.GetAll(request.AlbumName, "Name");
                _sUnitOfwork.Songs.Add(new Song { GenreId = request.GenreId, ArtistId = Artists[0]._id, AlbumId = newalbum[0]._id, Name = request.SongName, Views = 0, ThumbNail = request.SongThumbNail, Published = false, Url = request.Url, UploadDate = DateTime.Now, ArtistName = request.ArtistName });
            }
            else if(Songs.Count == 0)
            {
                _sUnitOfwork.Songs.Add(new Song { GenreId = request.GenreId, ArtistId = Artists[0]._id, AlbumId = Albums[0]._id, Name = request.SongName, Views = 0, ThumbNail = request.SongThumbNail, Published = false, Url = request.Url, UploadDate = DateTime.Now, ArtistName = request.ArtistName });
            }
        }

        // PLAYLISTS  **************************

        public object Get(GetPlaylistById request)
        {
            var tst = _sUnitOfwork.Playlists.GetById(request.Id);

            return new PlaylistResponse() { Result = tst };
        }

        public object Get(GetPlaylistByUserName request)
        {
            var fieldName = request.GetType().GetProperties()[0].Name.ToString();
            var tst = _sUnitOfwork.Playlists.GetAll(request.UserName, fieldName);

            return new GetAllPlaylistResponse() { Results = tst };
        }

        public void Post(AddToPlaylist request)
        {
            var playlist = _sUnitOfwork.Playlists.GetById(request.Id);
            if (!playlist.Songs.Contains(request.SongId))
            {
                _sUnitOfwork.Playlists.AddToArray(request.Id, request.SongId);
            }
        }
    }
}