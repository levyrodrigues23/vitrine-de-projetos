using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Graduates.Shared
{
    public record GraduateResponse(
        Guid Id,
        string Name,
        string Description,
        string GraduationYear,
        string Contact,
        Course Course
    );
}
