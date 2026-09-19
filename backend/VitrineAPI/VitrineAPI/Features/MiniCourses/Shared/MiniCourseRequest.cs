namespace VitrineAPI.Features.MiniCourses.Shared
{
    public record MiniCourseRequest(
        string Title,
        string Description,
        string Organizers,
        string TargetAudience
    );
}
