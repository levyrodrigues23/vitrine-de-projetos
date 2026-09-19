using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Papers.Shared;
using VitrineAPI.Features.Congresses.Shared;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Papers.Endpoints
{
    public class GetPaperByIdHandler(AppDbContext db)
    {
        public async Task<PaperResponse?> Handle(Guid id)
        {
            var paper = await db.Papers
                .AsNoTracking()
                .Include(a => a.Teacher)
                .Include(a => a.Congress)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (paper is null) return null;

            return new PaperResponse(
                paper.Id,
                paper.Title,
                paper.YearOfPublication,
                paper.Description,
                paper.Keywords,
                paper.Authors,
                paper.Base,
                new TeacherResponse(
                    paper.Teacher.Id,
                    paper.Teacher.Name,
                    paper.Teacher.Description,
                    paper.Teacher.Email,
                    paper.Teacher.Lattes,
                    paper.Teacher.Field,
                    paper.Teacher.AcademicDegree.ToString(),
                    paper.Teacher.ImageUrl
                ),
                new CongressResponse(
                    paper.Congress.Id,
                    paper.Congress.Title,
                    paper.Congress.Description,
                    paper.Congress.Date,
                    paper.Congress.Url,
                    paper.Congress.Location,
                    paper.Congress.Status
                )
            );
        }
    }

    [ApiController]
    [Route("api/papers")]
    public class GetPaperByIdController(GetPaperByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}", Name = "GetPaperById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}
