using Microsoft.Extensions.Configuration;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace Data
{
    public class StoreProcedureConnection
    {
        public StoreProcedureConnection(IConfiguration configuration)
        {
            StartConnection(configuration["ConnectionStrings:DefaultConnection"]);
            this.configuration = configuration;
        }

        private string databaseName = string.Empty;


        public string Password { get; set; }
        private MySqlConnection connection = null;
        private readonly IConfiguration configuration;

        public MySqlConnection Connection
        {
            get { return connection; }
        }
        private void StartConnection(string connectionString)
        {
            connection = new MySqlConnection(connectionString);
            connection.Open();
        }
        public bool IsConnect()
        {
            var isConnected = this.connection.State == System.Data.ConnectionState.Open;
            if (!isConnected)
            {
                StartConnection(configuration["ConnectionStrings:DefaultConnection"]);
            }
            return true;
        }

        public void Close()
        {
            connection.Close();
        }
    }
}