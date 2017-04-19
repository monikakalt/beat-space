using MongoDB.Bson;
using Music_api.ServiceModel.Models;
using ServiceStack;
using System.Collections.Generic;

namespace Music_api.ServiceModel
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
    public class GetSong : IReturn<Song>
    {
        public ObjectId Id { get; set; }
    }

    [Route("/allsongs/{AlbumId}", "GET")]
    public class GetSongs : IReturn<Song>
    {
        public ObjectId AlbumId { get; set; }
    }
}
