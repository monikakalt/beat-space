using Music_api.ServiceModel.Models;
using ServiceStack.ServiceHost;

namespace Music_api.ServiceModel.DTOs
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
    public class GetUserByUserName
    {
        public string UserName { get; set; }
    }
    [Route("/usersearch/{UserName}", "GET")]
    public class SearchForUser
    {
        public string UserName { get; set; }
    }

    [Route("/credentials/{Credentials}", "POST")]
    public class CheckCredentials
    {
        public string Credentials { get; set; }
    }

    [Route("/users", "POST")]
    public class CreateUser
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Credentials { get; set; }
    }

}
