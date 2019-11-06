using Npgsql;
using System;
using static System.Windows.Forms;
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

        public static bool GetUser(string email, string password = null)
        {
            try
            {
                conn = new NpgsqlConnection(connstring);
                conn.Open();

                email = MiscDBMethods.Sanitize(email);
                string suffix = $" where email = '{email}'";
                // varifying user existence
                if (password != null)
                {
                    suffix += $" and password = '{password}'";
                }
                sql = $"select * from users{suffix}";
                comm = new NpgsqlCommand(sql, conn);

                dt = new DataTable();
                dt.Load(comm.ExecuteReader());

                List<string> names = new List<string>();
                foreach (DataRow row in dt.Rows)
                {
                    names.Add(row["name"].ToString());
                }
                return true;
            }
            catch (Exception e)
            {

            }
            finally
            {

            }
            return false;
        }

        public static void InsertUser(string email, string pass)
        {
            try
            {
                byte[] salt;
                // generate salt
                new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

                var pbkdf2 = new Rfc2898DeriveBytes(pass, salt, 10000);
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

                conn.Close();
            }
            catch (Exception e)
            {

            }
        }

    }
}
