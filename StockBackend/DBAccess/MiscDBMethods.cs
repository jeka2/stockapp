using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBAccess
{
    public static class MiscDBMethods
    {
        public static string Sanitize(string str)
        {
            if (str.Contains("'"))
            {
                string[] temp = str.Split(new string[] { "'" }, StringSplitOptions.None);
                str = String.Join("''", temp);
            }
            return str;
        }

        public static string HashPassword(string pass)
        {
            return "hi";
        }
    }
}
