using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.Editais.Shared;

namespace VitrineAPI.Features.Editais.Endpoints
{
    public class GetEditalByIdHandler(AppDbContext db)
    {
        public async Task<EditalResponse?> Handle(Guid id)
        {
            var edital = await db.Editais.FindAsync(id);
            if (edital is null) return null;

            return new EditalResponse
            (
                edital.Id,
                edital.Title,
                edital.Description,
                edital.ImageUrl,
                edital.Link,
                edital.Status
            );
        }
    }

    [ApiController]
    [Route("api/editais")]
    public class GetEditalByIdController(GetEditalByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}", Name = "GetEditalById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}
