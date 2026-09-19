using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Editais.Shared
{
    public record EditalResponse(
        Guid Id,
        string Title,
        string Description,
        string? ImageUrl,
        string Link,
        EditalStatus Status
    );
}
