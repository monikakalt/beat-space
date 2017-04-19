using MongoDB.Bson;
using Music_api.ServiceModel.Models;
using ServiceStack.ServiceHost;
using System.Collections.Generic;

namespace Music_api.ServiceModel.DTOs
{
    public class GetAlbumResponse
    {
        public List<Album> Results { get; set; }
    }

    [Route("/allalbums/{ArtistId}", "GET")]
    public class GetAlbum
    {
        public ObjectId ArtistId { get; set; }
    }
}
