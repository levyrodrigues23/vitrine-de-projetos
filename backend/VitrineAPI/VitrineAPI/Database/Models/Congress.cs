using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class Congress
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty; // Já que o tipo em typescript é string, mantemos como string aqui também, mas idealmente deveria ser DateTime
        public string Url { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public CongressStatus Status { get; set; }
    }
}
