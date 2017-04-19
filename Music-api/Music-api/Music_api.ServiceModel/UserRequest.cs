using MongoDB.Bson;
using Music_api.ServiceModel.Models;
using ServiceStack;
using System.Collections.Generic;

namespace Music_api.ServiceModel
{
    public class UserResponse
    {
        public User Result { get; set; }
    }
    public class SearchResponse
    {
        public bool Result { get; set; }
    }

    [Route("/usersbyname/{UserName}", "GET")]
    public class GetUserByUserName : IReturn<User>
    {
        public string UserName { get; set; }
    }
    [Route("/usersearch/{UserName}", "GET")]
    public class SearchForUser : IReturn<User>
    {
        public string UserName { get; set; }
    }

    [Route("/credentials/{Credentials}", "POST")]
    public class CheckCredentials : IReturn<User>
    {
        public string Credentials { get; set; }
    }

    [Route("/users", "POST")]
    public class CreateUser : IReturn<User>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Credentials { get; set; }
    }

}
