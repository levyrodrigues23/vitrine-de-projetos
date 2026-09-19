using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class Edital
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public EditalStatus Status { get; set; }
    }
}
