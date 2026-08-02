namespace VitrineAPI.Features.Startups.Shared
{
    public record StartupResponse(
        Guid Id,
        string Title,
        string Description,
        string ImageUrl,
        string Category,
        string Contact
    );
}
