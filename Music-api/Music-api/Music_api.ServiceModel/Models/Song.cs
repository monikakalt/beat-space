using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Music_api.ServiceModel.Models
{
    public class Song
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public ObjectId GenreId { get; set; }
        public ObjectId ArtistId { get; set; }
        public ObjectId AlbumId { get; set; }
        public DateTime UploadDate { get; set; }
        public string ArtistName { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int Views { get; set; }
        public string ThumbNail { get; set; }
        public bool Published { get; set; }
    }
}