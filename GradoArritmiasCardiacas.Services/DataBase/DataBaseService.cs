using GradoArritmiasCardiacas.Models.History;
using GradoArritmiasCardiacas.Models.Login;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GradoArritmiasCardiacas.Services.DataBase
{
   public class DataBaseService
   {
      public async Task<MySqlConnection> GetConnectionAsync(String connectionString)
      {
         MySqlConnection connection = null;

         try
         {
            connection = new MySqlConnection(connectionString);
            await connection.OpenAsync();
         }
         catch (Exception ex)
         {
         }

         return connection;
      }

      public async Task<bool> LoginAsync(LoginRequest loginRequest, String connectionString)
      {
         Boolean validation = false;
         try
         {
            using (MySqlConnection connection = await GetConnectionAsync(connectionString))
            {
               using var command = new MySqlCommand($"SELECT password FROM user WHERE userName = '{loginRequest.userName}';", connection);
               using var reader = await command.ExecuteReaderAsync();
               while (await reader.ReadAsync())
               {
                  validation = reader.GetValue(0).ToString() == loginRequest.password ? true : false;
               }
            }
         }
         catch (Exception ex)
         {

         }

         return validation;
      }

      public async Task<Boolean> SinginAsync(SingInRequest singinRequest, String connectionString)
      {
         var result = false;
         try
         {
            using (MySqlConnection connection = await GetConnectionAsync(connectionString))
            {
               var query = $"INSERT INTO user (userName, name, lastName, weight, height, password) " +
                   $"VALUES ('{singinRequest.userName}','{singinRequest.Name}','{singinRequest.lastName}',{singinRequest.weight},{singinRequest.height},'{singinRequest.password}')";
               using var command = new MySqlCommand(query, connection);
               using var reader = await command.ExecuteReaderAsync();

               result = reader.RecordsAffected == 1;
            }

         }
         catch (Exception ex)
         {
            result = false;
         }

         return result;
      }

      public async Task<SingInRequest> GetUserAsync(String user, String connectionString)
      {
         var result = new SingInRequest();
         try
         {
            using (MySqlConnection connection = await GetConnectionAsync(connectionString))
            {
               var query = $"SELECT * FROM user WHERE userName = '{user}'";
               using var command = new MySqlCommand(query, connection);
               using var reader = await command.ExecuteReaderAsync();

               while (await reader.ReadAsync())
               {
                  result.userName = reader.GetValue(0).ToString();
                  result.Name = reader.GetValue(1).ToString();
                  result.lastName = reader.GetValue(2).ToString();
                  result.weight = Convert.ToDecimal(reader.GetValue(3));
                  result.height = Convert.ToDecimal(reader.GetValue(4).ToString());
               }
            }

         }
         catch (Exception ex)
         {
            result = null;
         }

         return result;
      }

      public async Task<Boolean> UpdateUserAsync(SingInRequest update, String connectionString)
      {
         var result = false;
         try
         {
            using (MySqlConnection connection = await GetConnectionAsync(connectionString))
            {
               var query = $"UPDATE user " +
                   $"SET name = '{update.Name}', lastName = '{update.lastName}', weight = {update.weight}, height = {update.height} " +
                   $"WHERE userName = '{update.userName}'";
               using var command = new MySqlCommand(query, connection);
               using var reader = await command.ExecuteReaderAsync();

               result = reader.RecordsAffected == 1;
            }
         }
         catch (Exception ex)
         {
            result = false;
         }

         return result;
      }

      public async Task<Boolean> SaveHistory(SaveHistoryRequest request, String connectionString)
      {
         var result = false;
         try
         {
            using (MySqlConnection connection = await GetConnectionAsync(connectionString))
            {
               var query = $"INSERT INTO historical (idUser, measure, measureDate) " +
                   $"VALUES ('{request.UserName}','{request.Data}',CURDATE())";
               using var command = new MySqlCommand(query, connection);
               using var reader = await command.ExecuteReaderAsync();

               result = reader.RecordsAffected == 1;
            }

         }
         catch (Exception ex)
         {
            result = false;
         }

         return result;
      }

      public async Task<Dictionary<string, string>> GetHistory(String user, String connectionString)
      {
         var result = new Dictionary<string, string>();
         try
         {
            using (MySqlConnection connection = await GetConnectionAsync(connectionString))
            {
               var query = $"SELECT * FROM historical WHERE idUser = '{user}'";
               using var command = new MySqlCommand(query, connection);
               using var reader = await command.ExecuteReaderAsync();

               while (await reader.ReadAsync())
               {
                  result.Add(reader.GetValue(3).ToString(), reader.GetValue(2).ToString());
               }
            }
         }
         catch (Exception ex)
         {
            result = null;
         }

         return result;
      }
   }
}
