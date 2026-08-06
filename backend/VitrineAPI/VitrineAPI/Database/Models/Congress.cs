using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class Congress
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty; // Since the TS type is string, we will keep it as string here. You can change it to DateTime if needed.
        public string Url { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public CongressStatus Status { get; set; }
    }
}
