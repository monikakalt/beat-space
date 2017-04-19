using Music_api.ServiceModel.Models;
using ServiceStack.ServiceHost;
using System.Collections.Generic;

namespace Music_api.ServiceModel.DTOs
{
    public class GetGenreResponse
        {
            public List<Genre> Results { get; set; }
        }


        [Route("/allgenres/", "GET")]
        public class GetGenres
        { }
}
