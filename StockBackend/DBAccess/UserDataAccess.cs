using Npgsql;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using static System.Security.Cryptography.PBKDF2;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBAccess
{
    public static class UserDataAccess
    {
        static string pass = Config.dbPassword;
        static private NpgsqlConnection conn;
        static string connstring = String.Format("Server={0};Port={1}; " +
            "User Id={2};Password={3};Database={4};", "localhost", "5432", "postgres",
            pass, "stockapp");
        static private DataTable dt;
        static private NpgsqlCommand comm;
        static private string sql = null;

        public static Dictionary<string, string> GetUser(string email, string password)
        {
            try
            {
                conn = new NpgsqlConnection(connstring);
                conn.Open();

                email = MiscDBMethods.Sanitize(email);
                password = MiscDBMethods.Sanitize(password);
                string suffix = $" where email = '{email}'";

                sql = $"select * from users{suffix}";
                comm = new NpgsqlCommand(sql, conn);

                dt = new DataTable();
                dt.Load(comm.ExecuteReader());

                string hashedPassword = null;

                foreach (DataRow row in dt.Rows)
                {
                    hashedPassword = row["password"].ToString();
                }

                if (hashedPassword != null) // user found, so now we compare
                {
                    byte[] hashBytes = Convert.FromBase64String(hashedPassword);
                    byte[] salt = new byte[16];
                    Array.Copy(hashBytes, 0, salt, 0, 16);

                    var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
                    byte[] hash = pbkdf2.GetBytes(20);

                    bool match = true;
                    for (int i = 0; i < 20; i++)
                    {
                        if (hashBytes[i + 16] != hash[i]) // if any part of the array doesn't match, the password is wrong
                        {
                            match = false;
                            return new Dictionary<string, string>() { { "Error", "Wrong Password" } };
                        }
                    }
                    Guid token = Guid.NewGuid();
                    sql = $"INSERT INTO tokens(token, user_email) VALUES('{token.ToString()}', '{email}')";

                    comm = new NpgsqlCommand(sql, conn);

                    comm.ExecuteNonQuery();

                    conn.Close();

                    return new Dictionary<string, string>() { { "Token", token.ToString() } };
                }
                else // The user doesn't exist
                {
                    return new Dictionary<string, string>() { { "Error", "User Doesn't Exist" } };
                }
                
            }
            catch (Exception e)
            {
                return new Dictionary<string, string>() { { "Error", "Unidentified Error" } };
            }
        }

        public static Dictionary<string, string> InsertUser(string email, string password)
        {
            try
            {
                email = MiscDBMethods.Sanitize(email);
                password = MiscDBMethods.Sanitize(password);
                byte[] salt;
                // generate salt
                new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

                var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
                // create array for the hashed password
                byte[] hash = pbkdf2.GetBytes(20);
                // create array of 20 bytes for password and 16 for salt
                byte[] hashBytes = new byte[36];

                Array.Copy(salt, 0, hashBytes, 0, 16);
                Array.Copy(hash, 0, hashBytes, 16, 20);
                // now, byte array to the final hashed+salt string
                string passwordToStore = Convert.ToBase64String(hashBytes);
                conn = new NpgsqlConnection(connstring);
                conn.Open();
                //sql = "select * from get_users()";
                sql = $"INSERT INTO users(email, password) VALUES('{email}', '{passwordToStore}')";
                comm = new NpgsqlCommand(sql, conn);

                comm.ExecuteNonQuery();

                // along with creating the user, we'll sign them in and provide a session token
                Guid token = Guid.NewGuid();
                sql = $"INSERT INTO tokens(token, user_email) VALUES('{token.ToString()}', '{email}')";

                comm = new NpgsqlCommand(sql, conn);

                comm.ExecuteNonQuery();

                conn.Close();

                return new Dictionary<string, string>() { { "Token", token.ToString() } };
            }
            catch (Exception e)
            {
                return new Dictionary<string, string>() { { "Error", "Unidentified Error" } };
            }
        }

        public static bool CheckAuthToken(string token, bool erase=false)
        {
            conn = new NpgsqlConnection(connstring);
            conn.Open();

            sql = $"select * from tokens WHERE token='{token}'";
            comm = new NpgsqlCommand(sql, conn);

            dt = new DataTable();
            dt.Load(comm.ExecuteReader());

            bool exists = false;

            foreach (DataRow row in dt.Rows)
            {
                exists = true;
            }

            return exists;
        }

    }
}
