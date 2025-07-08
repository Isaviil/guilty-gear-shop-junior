using Microsoft.Extensions.Configuration;  // For IConfiguration
using System.Data;                       // For CommandType, DataTable, etc.
using Microsoft.Data.SqlClient;             // For SqlConnection, SqlCommand
using System.Collections.Generic;
using System.Reflection.Metadata;         // For Dictionary<>

namespace LAYER_DIO
{
    public class DAOLibrary
    {
        private readonly string _connectionString;

        
        public DAOLibrary(IConfiguration gatito) {

            _connectionString = gatito.GetConnectionString("DefaultConnection") ??
                throw new ArgumentNullException("Default connection string is missing");
        }

        

        public void ExecuteNonquery(string StoredProcedureName, Dictionary<string, object> parameters)
        {
            using SqlConnection cnx = new SqlConnection(_connectionString);
            cnx.Open();

            using SqlCommand cmd = new SqlCommand(StoredProcedureName, cnx)
            {
                CommandType = CommandType.StoredProcedure
            };
            if (parameters != null)
            {
                foreach (var param in parameters)
                {
                    
                    cmd.Parameters.AddWithValue(param.Key, param.Value??DBNull.Value);
                }
            }

            cmd.ExecuteNonQuery();
        }
            
        public DataTable ExecuteQuery (string StoredProcedureName, Dictionary<string, object> parameters)
        {
            using SqlConnection cnx = new SqlConnection(_connectionString);
            cnx.Open();

            using SqlCommand cmd = new SqlCommand(StoredProcedureName, cnx)
            {
                CommandType = CommandType.StoredProcedure
            };

            if (parameters != null) 
            { 
                foreach (var param in parameters)
                {
                    
                    cmd.Parameters.AddWithValue(param.Key, param.Value ?? DBNull.Value);
                }
            }

            using SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            return dt;            
        }

        public DataTable ExecuteQueryRaw(string sql, Dictionary<string, object> parameters)
        {
            using SqlConnection cnx = new SqlConnection(_connectionString);
            cnx.Open();

            using SqlCommand cmd = new SqlCommand(sql, cnx)
            {
                CommandType = CommandType.Text
            };

            if (parameters != null)
            {
                foreach (var param in parameters)
                {
                    cmd.Parameters.AddWithValue(param.Key, param.Value ?? DBNull.Value);
                }
            }

            using SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            return dt;
        }

    }
}
