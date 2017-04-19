using MongoDB.Bson;
using Music_api.ServiceModel.Models;
using ServiceStack.ServiceHost;
using System.Collections.Generic;

namespace Music_api.ServiceModel.DTOs
{
    public class GetAllPlaylistResponse
    {
        public List<Playlist> Results { get; set; }
    }
    public class PlaylistResponse
    {
        public Playlist Result { get; set; }
    }

    [Route("/playlistbyname/{Name}", "GET")]
    public class GetPlaylistByName
    {
        public string Name { get; set; }
    }
    [Route("/playlist/{Id}", "GET")]
    public class GetPlaylistById
    {
        public ObjectId Id { get; set; }
    }
    [Route("/playlistsbyowner/{UserName}", "GET")]
    public class GetPlaylistByUserName
    {
        public string UserName { get; set; }
    }



    [Route("/addtoplaylist/", "POST")]
    public class AddToPlaylist
    {
        public ObjectId Id { get; set; }
        public ObjectId SongId { get; set; }
    }

    [Route("/playlist/", "POST")]
    public class CreatePlaylist
    {
        public ObjectId Owner { get; set; }
        public string Name { get; set; }
        public ObjectId[] Songs { get; set; }
        public bool Public { get; set; }
    }


}
