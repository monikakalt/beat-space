using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Music_api.ServiceModel.Models
{
    public class Genre
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public int Views { get; set; }
        public string Description { get; set; }
        public string ThumbNail { get; set; }
    }
}
