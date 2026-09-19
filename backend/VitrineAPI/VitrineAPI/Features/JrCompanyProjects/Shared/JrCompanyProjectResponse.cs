namespace VitrineAPI.Features.JrCompanyProjects.Shared
{
    public record JrCompanyProjectResponse(
        Guid Id,
        string Title,
        string Description,
        string ImageUrl,
        string CompanyName,
        string Contact
    );
}
