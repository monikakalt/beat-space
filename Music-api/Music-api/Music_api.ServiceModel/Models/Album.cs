using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Music_api.ServiceModel.Models
{
    public class Album
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public ObjectId GenreId { get; set; }
        public ObjectId ArtistId { get; set; }
        public string Name { get; set; }
        public int Views { get; set; }
        public string ThumbNail { get; set; }
    }
}