namespace VitrineAPI.Features.Graduates.Shared
{
    public record GraduateRequest(
        string Name,
        string Description,
        string GraduationYear,
        string Contact,
        string Course
    );
}
