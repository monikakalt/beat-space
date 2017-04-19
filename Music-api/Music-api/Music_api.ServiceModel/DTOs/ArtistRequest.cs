using MongoDB.Bson;
using Music_api.ServiceModel.Models;
using ServiceStack.ServiceHost;
using System.Collections.Generic;

namespace Music_api.ServiceModel.DTOs
{
    public class GetArtistResponse
    {
        public List<Artist> Results { get; set; }
    }

    [Route("/allartists/{GenreId}", "GET")]
    public class GetArtists
    {
        public ObjectId GenreId { get; set; }
    }
}
