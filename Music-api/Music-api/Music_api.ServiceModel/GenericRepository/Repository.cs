using System;
using System.Linq;
using System.Linq.Expressions;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Music_api.ServiceModel.Models;
using System.Collections.Generic;

namespace Music_api.ServiceModel.GenericRepository
{
    public class Repository<T> where T : class
    {
        private MongoDatabase _database;
        private string _tableName;
        private MongoCollection<T> _collection;
        // constructor to initialise database and table/collection  
        public Repository(MongoDatabase db, string tblName)
        {
            _database = db;
            _tableName = tblName;
            _collection = _database.GetCollection<T>(tblName);
        }


        public T Get(string name)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("UserName", name);
            Expression<Func<User, bool>> criteria = x => x.UserName == name;
            var query = Query<User>.Where(criteria);
            return _collection.FindOne(query);

        }
        public T Credentials(string code)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("Credentials", code);
            Expression<Func<User, bool>> criteria = x => x.Credentials == code;
            var query = Query<User>.Where(criteria);
            return _collection.FindOne(query);

        }

        public IQueryable<T> GetAll()     // Used to get all genres
        {
            MongoCursor<T> cursor = _collection.FindAll();
            return cursor.AsQueryable<T>();
        }

        public T GetById(ObjectId id)
        {
            var query_id = Query.EQ("_id", id);
            var Result = _collection.FindOne(query_id);

            return Result;
        }

        public List<T> GetAll(ObjectId id, string fieldName)  // Genres, Artists, Albums, Songs
        {
            var query_id = Query.EQ(fieldName, id);

            return _collection.Find(query_id).ToList();

        }
        public List<T> GetAll(string name, string fieldName)  // Genres, Artists, Albums, Songs
        {
            var query_id = Query.EQ(fieldName, name);

            return _collection.Find(query_id).ToList();

        }

        public void Add(T entity)
        {
            _collection.Insert(entity);
        }
        public void AddToArray(ObjectId id, ObjectId element)
        {
      
            IMongoQuery query = Query.EQ("_id", id);
            IMongoUpdate updateQuery = Update.Push("Songs", element);
            _collection.Update(query, updateQuery);

        }


        public List<T> SearchDatabase(string Keyword)
        {
            string small = Keyword.ToLower();
            BsonRegularExpression regex1 = new BsonRegularExpression("^.*" + small + ".*$");  // lowercase
            BsonRegularExpression regex2 = new BsonRegularExpression("^.*" + Keyword.First().ToString().ToUpper() + String.Join("", Keyword.Skip(1)) + ".*$"); // capital

            IMongoQuery query1 = Query.Matches("Name", regex1);
            IMongoQuery query2 = Query.Matches("Name", regex2);


            List<T> result = _collection.Find(query1).ToList();
            if(result.Count == 0)
                result = _collection.Find(query2).ToList();


            return result;
        }
    }
}