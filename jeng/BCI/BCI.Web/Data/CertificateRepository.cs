using BCI.Web.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace BCI.Web.Data
{
    public class CertificateRepository : ICertificateRepository
    {

        private readonly string _bciConnectionString;
        private readonly IConfiguration _configuration;

        public CertificateRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _bciConnectionString = _configuration.GetConnectionString("BCIConnection");
        }

        public async Task InsertRecord(InsertCertificateModel model)
        {
            var dictionary = new Dictionary<string, object>
            {
                { "FileHash", model.FileHash },
                { "UserId", model.UserId }
            };

            var parameters = new DynamicParameters(dictionary);

            var query = "INSERT INTO [dbo].[Certificate] ([UserID], [FileHash]) VALUES (@UserId, @FileHash)";

            using (var db = new SqlConnection(_bciConnectionString))
            {
                await db.ExecuteAsync(query, parameters, commandType: CommandType.Text).ConfigureAwait(false);
            }
        }

        public async Task<IEnumerable<CertificateModel>> GetAllRecords()
        {
            var query = "SELECT ID as Id, UserID AS UserId, FileHash from [dbo].[Certificate]";

            using (var db = new SqlConnection(_bciConnectionString))
            {
                return await db.QueryAsync<CertificateModel>(query, null, commandType: CommandType.Text).ConfigureAwait(false);
            }
        }
    }
}
