using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Graduates.Shared;

namespace VitrineAPI.Features.Graduates.Endpoints
{
    public class GetGraduatesHandler(AppDbContext db)
    {
        public async Task<List<GraduateResponse>> Handle()
        {
            return await db.Graduates
                .Select(graduate => new GraduateResponse(
                    graduate.Id,
                    graduate.Name,
                    graduate.Description,
                    graduate.GraduationYear,
                    graduate.Contact,
                    graduate.Course
                ))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/graduates")]
    public class GetGraduatesController(GetGraduatesHandler handler) : ControllerBase
    {
        [HttpGet(Name = "GetGraduates")]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}
