namespace VitrineAPI.Features.Startups.Shared
{
    public record StartupRequest(
        string Title,
        string Description,
        string ImageUrl,
        string Category,
        string Contact
    );
}
