namespace VitrineAPI.Features.JrCompanyProjects.Shared
{
    public record JrCompanyProjectRequest(
        string Title,
        string Description,
        string ImageUrl,
        string CompanyName,
        string Contact
    );
}