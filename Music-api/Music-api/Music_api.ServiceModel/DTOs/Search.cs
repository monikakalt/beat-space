using MongoDB.Bson;
using ServiceStack.ServiceHost;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Music_api.ServiceModel.DTOs
{
    public class DbSearchResponse
    {
       // public string Type { get; set; }
        public List<IList> Results { get; set; }
    }

    [Route("/search/{KeyWord}", "GET")]
    public class ObjectSearch
    {
        public string KeyWord { get; set; }
    }
}
