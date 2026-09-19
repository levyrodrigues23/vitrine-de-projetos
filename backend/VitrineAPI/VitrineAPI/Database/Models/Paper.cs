namespace VitrineAPI.Database.Models
{
    public class Paper
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public int YearOfPublication { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? Keywords { get; set; }
        public string Authors { get; set; } = string.Empty;
        public string Base { get; set; } = string.Empty;
        public Guid TeacherId { get; set; }
        public Teacher Teacher { get; set; } = null!;
        public Guid CongressId { get; set; }
        public Congress Congress { get; set; } = null!;
    }
}
