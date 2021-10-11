using BCI.Web.Data;
using BCI.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BCI.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CertificateController : ControllerBase
    {
        private readonly ICertificateRepository _certificateRepository;

        public CertificateController(ICertificateRepository certificateRepository)
        {
            _certificateRepository = certificateRepository;
        }

        [HttpGet("all", Name = "GetAllCertificates")]
        public async Task<ActionResult<IEnumerable<CertificateModel>>> GetAllCertificates()
        {
            var result = await _certificateRepository.GetAllRecords();
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put(InsertCertificateModel model)
        {
            await _certificateRepository.InsertRecord(model);
            return Ok();
        }
    }
}
