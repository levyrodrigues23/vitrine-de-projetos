using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.Congresses.Shared;

namespace VitrineAPI.Features.Congresses.Endpoints
{
    public class GetCongressByIdHandler(AppDbContext db)
    {
        public async Task<CongressResponse?> Handle(Guid id)
        {
            var congress = await db.Congresses.FindAsync(id);
            if (congress is null) return null;

            return new CongressResponse
            (
                congress.Id,
                congress.Title,
                congress.Description,
                congress.Date,
                congress.Url,
                congress.Location,
                congress.Status
            );
        }
    }

    [ApiController]
    [Route("api/congresses")]
    public class GetCongressByIdController(GetCongressByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}", Name = "GetCongressById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}