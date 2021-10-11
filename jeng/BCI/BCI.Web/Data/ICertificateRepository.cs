using BCI.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BCI.Web.Data
{
    public interface ICertificateRepository
    {
        Task InsertRecord(InsertCertificateModel model);
        Task<IEnumerable<CertificateModel>> GetAllRecords();
    }
}
