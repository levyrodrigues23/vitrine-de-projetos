using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Papers.Shared;
using VitrineAPI.Features.Congresses.Shared;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Papers.Endpoints
{
    public class GetPapersHandler(AppDbContext db)
    {
        public async Task<List<PaperResponse>> Handle()
        {
            return await db.Papers
                .AsNoTracking()
                .Include(paper => paper.Teacher)
                .Include(paper => paper.Congress)
                .Select(paper => new PaperResponse(
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
                ))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/papers")]
    public class GetPapersController(GetPapersHandler handler) : ControllerBase
    {
        [HttpGet(Name = "GetPapers")]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}
