using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Congresses.Shared
{
    public record CongressResponse
    (
        Guid Id,
        string Title,
        string Description,
        string Date,
        string Url,
        string Location,
        CongressStatus Status
    );
}
