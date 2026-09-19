using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.Startups.Shared;

namespace VitrineAPI.Features.Startups.Endpoints
{
    public class GetStartupByIdHandler(AppDbContext db)
    {
        public async Task<StartupResponse?> Handle(Guid id)
        {
            var startup = await db.Startups.FindAsync(id);
            if (startup is null) return null;

            return new StartupResponse(
                startup.Id,
                startup.Title,
                startup.Description,
                startup.ImageUrl,
                startup.Category,
                startup.Contact
            );
        }
    }

    [ApiController]
    [Route("api/startups")]
    public class GetStartupByIdController(GetStartupByIdHandler handler) : ControllerBase
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