using MongoDB.Driver;
using Music_api.ServiceModel.GenericRepository;
using Music_api.ServiceModel.Models;
using System.Configuration;

namespace Music_api.ServiceModel.UnitOfWork
{
    public class UnitOfWork
    {
        private MongoDatabase _database;
        protected Repository<Playlist> _Playlists;
        protected Repository<User> _Users;
        protected Repository<Genre> _Genres;
        protected Repository<Artist> _Artists;
        protected Repository<Album> _Albums;
        protected Repository<Song> _Songs;

        public UnitOfWork()
        {
            var connectionString = ConfigurationManager.AppSettings["MongoDBConectionString"];
            var client = new MongoClient(connectionString);
            var credential = MongoCredential.CreateCredential("Music", "mongodb", "mongodb123");

            var settings = new MongoClientSettings
            {
                Credentials = new[] { credential },
                Server = new MongoServerAddress("lab14.lei.lt")
            };
            var mongoClient = new MongoClient(settings);
            var mongoServer = mongoClient.GetServer();

            var databaseName = ConfigurationManager.AppSettings["MongoDBDatabaseName"];
            _database = mongoServer.GetDatabase(databaseName);
        }
      
        public Repository<User> Users
        {
            get
            {
                if (_Users == null)
                    _Users = new Repository<User>(_database, "Users");

                return _Users;
            }
        }

        public Repository<Genre> Genres
        {
            get
            {
                if (_Genres == null)
                    _Genres = new Repository<Genre>(_database, "Genres");

                return _Genres;
            }
        }
        public Repository<Artist> Artists
        {
            get
            {
                if (_Artists == null)
                    _Artists = new Repository<Artist>(_database, "Artists");

                return _Artists;
            }
        }
        public Repository<Album> Albums
        {
            get
            {
                if (_Albums == null)
                    _Albums = new Repository<Album>(_database, "Albums");

                return _Albums;
            }
        }
        public Repository<Song> Songs
        {
            get
            {
                if (_Songs == null)
                    _Songs = new Repository<Song>(_database, "Songs");

                return _Songs;
            }
        }
        public Repository<Playlist> Playlists
        {
            get
            {
                if (_Playlists == null)
                    _Playlists = new Repository<Playlist>(_database, "Playlists");

                return _Playlists;
            }
        }
    }
}