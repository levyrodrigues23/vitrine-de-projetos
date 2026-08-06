using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Congresses.Shared;

namespace VitrineAPI.Features.Congresses.Endpoints
{
    public class GetCongressesHandler(AppDbContext db)
    {
        public async Task<List<CongressResponse>> Handle()
        {
            return await db.Congresses
                .Select(congress => new CongressResponse(
                    congress.Id,
                    congress.Title,
                    congress.Description,
                    congress.Date,
                    congress.Url,
                    congress.Location,
                    congress.Status
                ))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/congresses")]
    public class GetCongressesController(GetCongressesHandler handler) : ControllerBase
    {
        [HttpGet(Name = "GetCongresses")]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}