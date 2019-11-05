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
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Users
        public void Post([FromBody]UserData data)
        {
            string email = data.email;
            string pass = data.pass;
            string passConfig = data.passConfirm;
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
    public class UserData
    {
        public string email { get; set; }
        public string pass { get; set; }
        public string passConfirm { get; set; }
    }
}
