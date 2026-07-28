using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Database.Models
{
    public class MiniCourse
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Organizers { get; set; } = string.Empty;
        public MiniCourseTargetAudience TargetAudience { get; set; }
    }
}
