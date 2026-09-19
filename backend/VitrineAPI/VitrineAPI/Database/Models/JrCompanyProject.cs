namespace VitrineAPI.Database.Models
{
    public class JrCompanyProject
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string Contact { get; set; } = string.Empty;
    }
}