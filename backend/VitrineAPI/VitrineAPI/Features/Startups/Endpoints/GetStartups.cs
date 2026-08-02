using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Startups.Shared;

namespace VitrineAPI.Features.Startups.Endpoints
{
    public class GetStartupsHandler(AppDbContext db)
    {
        public async Task<List<StartupResponse>> Handle()
        {
            return await db.Startup
                .Select(p => new StartupResponse(
                    p.Id,
                    p.Title,
                    p.Description,
                    p.ImageUrl,
                    p.Category,
                    p.Contact
                ))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/startups")]
    public class GetStartupsController(GetStartupsHandler handler) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}