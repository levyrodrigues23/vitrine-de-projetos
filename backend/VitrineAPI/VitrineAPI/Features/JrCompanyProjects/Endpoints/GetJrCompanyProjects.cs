using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.JrCompanyProjects.Shared;

namespace VitrineAPI.Features.JrCompanyProjects.Endpoints
{
    public class GetJrCompanyProjectsHandler(AppDbContext db)
    {
        public async Task<List<JrCompanyProjectResponse>> Handle()
        {
            return await db.JrCompanyProjects
                .Select(p => new JrCompanyProjectResponse(
                    p.Id,
                    p.Title,
                    p.Description,
                    p.ImageUrl,
                    p.CompanyName,
                    p.Contact
                ))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/jr-company-projects")]
    public class GetJrCompanyProjectsController(GetJrCompanyProjectsHandler handler) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}
