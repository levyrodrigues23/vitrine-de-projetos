namespace VitrineAPI.Features.Papers.Shared
{
    public record PaperRequest(
        string Title,
        int YearOfPublication,
        string Description,
        string? Keywords,
        string Authors,
        string Base,
        Guid TeacherId,
        Guid CongressId
    );
}
