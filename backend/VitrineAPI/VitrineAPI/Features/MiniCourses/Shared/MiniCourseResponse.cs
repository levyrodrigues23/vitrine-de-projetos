using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.MiniCourses.Shared
{
    public record MiniCourseResponse(
        Guid Id,
        string Title,
        string Description,
        string Organizers,
        MiniCourseTargetAudience TargetAudience
    );
}
