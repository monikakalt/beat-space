using MongoDB.Bson;
using Music_api.ServiceModel.Models;
using ServiceStack.ServiceHost;
using System;
using System.Collections.Generic;

namespace Music_api.ServiceModel.DTOs
{
    public class GetManySongsResponse
    {
        public List<Song> Results { get; set; }
    }

    public class GetSongResponse
    {
        public Song Results { get; set; }
    }

    [Route("/song/{Id}", "GET")]
    public class GetSong
    {
        public ObjectId Id { get; set; }
    }
    [Route("/song", "POST")]
    public class PostSong
    {
        public ObjectId GenreId { get; set; }
      //  public ObjectId ArtistId { get; set; }
      //  public ObjectId AlbumId { get; set; }
        public DateTime UploadDate { get; set; }
        public string ArtistName { get; set; }

        public string AlbumName { get; set; }
        public string SongName { get; set; }
        public string Url { get; set; }
        public int Views { get; set; }
        public string ArtistThumbNail { get; set; }
        public string AlbumThumbNail { get; set; }
        public string SongThumbNail { get; set; }
        public bool Published { get; set; }
    }

    [Route("/allsongs/{AlbumId}", "GET")]
    public class GetSongs
    {
        public ObjectId AlbumId { get; set; }
    }
}
