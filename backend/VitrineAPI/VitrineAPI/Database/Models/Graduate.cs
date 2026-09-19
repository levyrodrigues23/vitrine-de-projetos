using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class Graduate
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string GraduationYear { get; set; } = string.Empty; // Já que o tipo em typescript é string, mantemos como string aqui também, mas idealmente deveria ser DateTime
        public string Contact { get; set; } = string.Empty;
        public Course Course { get; set; }
    }
}
