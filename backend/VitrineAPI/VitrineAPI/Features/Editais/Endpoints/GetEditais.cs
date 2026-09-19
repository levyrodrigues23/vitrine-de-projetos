using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Editais.Shared;

namespace VitrineAPI.Features.Editais.Endpoints
{
    public class GetEditaisHandler(AppDbContext db)
    {
        public async Task<List<EditalResponse>> Handle()
        {
            return await db.Editais
                .Select(edital => new EditalResponse(
                    edital.Id,
                    edital.Title,
                    edital.Description,
                    edital.ImageUrl,
                    edital.Link,
                    edital.Status
                ))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/editais")]
    public class GetEditaisController(GetEditaisHandler handler) : ControllerBase
    {
        [HttpGet(Name = "GetEditais")]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}
