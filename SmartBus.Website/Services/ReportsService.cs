using Data;
using MySql.Data.MySqlClient;
using SmartBus.Website.Data;
using SmartBus.Website.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public class ReportsService
    {
        private readonly StoreProcedureConnection connection;

        public ReportsService(StoreProcedureConnection connection)
        {
            this.connection = connection;
        }
        public ICollection<TripsByUserReportRow> GetTripsByUser()
        {
            var result = new List<TripsByUserReportRow>();
            if (connection.IsConnect())
            {
                //suppose col0 and col1 are defined as VARCHAR in the DB
                string query = "CALL TripsByUser()";
                var cmd = new MySqlCommand(query, connection.Connection);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int userId = reader.GetInt32(0);
                    string userName = reader.GetString(1);
                    string userLastName = reader.GetString(2);
                    int tripCount = reader.GetInt32(3);
                    result.Add(new TripsByUserReportRow()
                    {
                        Id = userId,
                        Name = userName,
                        LastName = userLastName,
                        TripCount = tripCount
                    });
                }
                connection.Close();
            }
            return result;
        }
        public ICollection<RoutesByUserRow> GetRoutesByUser()
        {
            var result = new List<RoutesByUserRow>();
            if (connection.IsConnect())
            {
                //suppose col0 and col1 are defined as VARCHAR in the DB
                string query = "CALL RoutesByUser()";
                var cmd = new MySqlCommand(query, connection.Connection);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    int? routeId = reader.GetInt32(0);
                    string routeName = reader.GetString(1);
                    int userId = reader.GetInt32(2);
                    string userName = reader.GetString(3);
                    string userLastName = reader.GetString(4);

                    result.Add(new RoutesByUserRow()
                    {
                        UserId = userId,
                        Name = userName,
                        LastName = userLastName,
                        RouteId = routeId.GetValueOrDefault(),
                        RouteName = routeName
                    });
                }
                connection.Close();
            }
            return result;
        }
    }
}
