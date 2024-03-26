using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace FitnessApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public List<TableRowModel> TableRows { get; set; }

        public IActionResult OnGet()
        {
            FetchDataFromDatabase();
            return Page();
        }

        public IActionResult OnPost()
        {
            string workoutName = Request.Form["workoutName"];
            DateTime workoutDate = DateTime.Parse(Request.Form["workoutDate"]);

            string connectionString = "Server=localhost;Database=FitnessApp;User Id=SA;Password=Gmr_41!41!0";
            string SqlInsert = "INSERT INTO Workouts (WorkoutName, WorkoutDate) VALUES (@WorkoutName, @WorkoutDate)";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(SqlInsert, connection))
                    {
                        command.Parameters.AddWithValue("@WorkoutName", workoutName);
                        command.Parameters.AddWithValue("@WorkoutDate", workoutDate);

                        command.ExecuteNonQuery();
                    }
                }

                FetchDataFromDatabase(); // Refresh the data
                return Page(); // Return the page to display the updated data
            }
            catch (Exception ex)
            {
                // Handle any exceptions
                _logger.LogError(ex, "An error occurred while inserting data into the database.");
                // You might want to handle errors differently, like displaying an error message on the page
                return Page(); // Return the page even if an error occurs
            }
        }

        private void FetchDataFromDatabase()
        {
            string connectionString = "Server=localhost;Database=FitnessApp;User Id=SA;Password=Gmr_41!41!0";
            string SqlQuery = "SELECT WorkoutId, WorkoutName, WorkoutDate FROM Workouts";

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(SqlQuery, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            TableRows = new List<TableRowModel>();

                            while (reader.Read())
                            {
                                int workoutId = reader.GetInt32(0);
                                string workoutName = reader.GetString(1);
                                DateTime workoutDate = reader.GetDateTime(2);

                                TableRows.Add(new TableRowModel
                                {
                                    WorkoutId = workoutId,
                                    WorkoutName = workoutName,
                                    WorkoutDate = workoutDate
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions
                _logger.LogError(ex, "An error occurred while connecting to the database.");
                // You might want to handle errors differently, like displaying an error message on the page
            }
        }

        public class TableRowModel
        {
            public int WorkoutId { get; set; }
            public string WorkoutName { get; set; }
            public DateTime WorkoutDate { get; set; }
        }
    }
}
