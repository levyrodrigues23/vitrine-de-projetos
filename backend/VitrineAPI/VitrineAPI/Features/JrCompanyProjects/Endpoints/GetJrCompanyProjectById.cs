using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.JrCompanyProjects.Shared;

namespace VitrineAPI.Features.JrCompanyProjects.Endpoints
{
    public class GetJrCompanyProjectByIdHandler(AppDbContext db)
    {
        public async Task<JrCompanyProjectResponse?> Handle(Guid id)
        {
            var jrCompanyProject = await db.JrCompanyProjects.FindAsync(id);
            if (jrCompanyProject is null) return null;

            return new JrCompanyProjectResponse(
                jrCompanyProject.Id,
                jrCompanyProject.Title,
                jrCompanyProject.Description,
                jrCompanyProject.ImageUrl,
                jrCompanyProject.CompanyName,
                jrCompanyProject.Contact
            );
        }
    }

    [ApiController]
    [Route("api/jr-company-projects")]
    public class GetJrCompanyProjectByIdController(GetJrCompanyProjectByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}
