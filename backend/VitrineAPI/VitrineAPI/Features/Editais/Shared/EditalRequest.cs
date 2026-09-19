namespace VitrineAPI.Features.Editais.Shared
{
    public record EditalRequest(
        string Title,
        string Description,
        string? ImageUrl,
        string Link,
        string Status
    );
}
