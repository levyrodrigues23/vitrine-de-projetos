using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Congresses.Shared
{
    public record CongressRequest
    (
        string Title,
        string Description,
        string Date,
        string Url,
        string Location,
        string Status
    );
}
