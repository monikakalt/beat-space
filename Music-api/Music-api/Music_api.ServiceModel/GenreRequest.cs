using Music_api.ServiceModel.Models;
using ServiceStack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music_api.ServiceModel
{
        public class GetGenreResponse
        {
            public List<Genre> Results { get; set; }
        }


        [Route("/allgenres/", "GET")]
        public class GetGenres : IReturn<Genre>
        { }
}
