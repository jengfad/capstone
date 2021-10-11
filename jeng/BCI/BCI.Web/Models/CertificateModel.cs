namespace BCI.Web.Models
{
    public class CertificateModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FileHash { get; set; }
    }
}
