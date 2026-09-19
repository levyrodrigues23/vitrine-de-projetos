using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.Graduates.Shared;

namespace VitrineAPI.Features.Graduates.Endpoints
{
    public class GetGraduateByIdHandler(AppDbContext db)
    {
        public async Task<GraduateResponse?> Handle(Guid id)
        {
            var graduate = await db.Graduates.FindAsync(id);
            if (graduate is null) return null;

            return new GraduateResponse
            (
                graduate.Id,
                graduate.Name,
                graduate.Description,
                graduate.GraduationYear,
                graduate.Contact,
                graduate.Course
            );
        }
    }

    [ApiController]
    [Route("api/graduates")]
    public class GetGraduateByIdController(GetGraduateByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}", Name = "GetGraduateById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}
