using Npgsql;
using System;
using System.Collections.Generic;
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

        public static List<string> GetUser(string name)
        {
            name = MiscDBMethods.Sanitize(name);
            try
            {
                conn = new NpgsqlConnection(connstring);
                conn.Open();
                string suffix = $" where name = '{name}'";
                sql = $"select * from users{suffix}";
                comm = new NpgsqlCommand(sql, conn);

                dt = new DataTable();
                dt.Load(comm.ExecuteReader());

                List<string> names = new List<string>();
                foreach (DataRow row in dt.Rows)
                {
                    names.Add(row["name"].ToString());
                }
                return names;
            }
            catch (Exception e)
            {

            }
            finally
            {

            }
            return null;
        }

        public static void InsertUser(string email, string pass)
        {
            try
            {
                conn = new NpgsqlConnection(connstring);
                conn.Open();
                //sql = "select * from get_users()";
                sql = $"INSERT INTO users(email) VALUES('{userName}')";
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
