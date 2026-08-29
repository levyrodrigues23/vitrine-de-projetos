using VitrineAPI.Features.Congresses.Shared;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Papers.Shared
{
    public record PaperResponse(
        Guid Id,
        string Title,
        int YearOfPublication,
        string Description,
        string? Keywords,
        string Authors,
        string Base,
        TeacherResponse Teacher,
        CongressResponse Congress
    );
}
