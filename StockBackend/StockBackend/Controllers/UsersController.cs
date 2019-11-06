using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DBAccess;

namespace StockBackend.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        // GET: api/Users

        public string Get([FromBody] string s)
        {
            return s;
        }

        [Route("api/users/email/{email}/password/{pass}")]
        public Dictionary<string, string> GetCheckAuthentication(string email, string pass)
        {
            var sessionToken = UserDataAccess.GetUser(email, pass);
            return sessionToken;
        }
        // GET: api/Users/5
        public string Get(string email, string password = null)
        {
            UserDataAccess.GetUser(email, password);
            return "value";
        }

        // POST: api/Users
        public Dictionary<string, string> Post([FromBody]User data)
        {
            string email = data.email;
            string pass = data.pass;

            var sessionToken = UserDataAccess.InsertUser(email, pass);
            return sessionToken;
        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
        }

        [Route("api/Users/token/{token}")]
        public bool GetUserByToken(string token)
        {
            bool authenticated = UserDataAccess.CheckAuthToken(token);
            return authenticated;
        }
    }
    public class User
    {
        public string email { get; set; }
        public string pass { get; set; }
    }
}
