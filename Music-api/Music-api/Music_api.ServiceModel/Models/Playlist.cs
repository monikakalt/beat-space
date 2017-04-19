using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Music_api.ServiceModel.Models
{
    public class Playlist
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public ObjectId[] Songs { get; set; }
        public bool Public { get; set; }
    }
}
