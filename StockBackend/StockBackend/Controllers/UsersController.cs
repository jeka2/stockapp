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
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Users/5
        public string Get(string email, string password = null)
        {
            UserDataAccess.GetUser(email, password);
            return "value";
        }

        // POST: api/Users
        public void Post([FromBody]User data)
        {
            string email = data.email;
            string pass = data.pass;
            var s = "sdf";
            var d = "sdfs";
            DBAccess.UserDataAccess.InsertUser(email, pass);
        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
        }
    }
    public class User
    {
        public string email { get; set; }
        public string pass { get; set; }
    }
}
