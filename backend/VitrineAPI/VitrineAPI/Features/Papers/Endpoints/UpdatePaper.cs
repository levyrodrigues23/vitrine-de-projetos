using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.Papers.Shared;
using VitrineAPI.Features.Congresses.Shared;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Papers.Endpoints
{
    public class UpdatePaperHandler(AppDbContext db)
    {
        public async Task<PaperResponse?> Handle(Guid id, PaperRequest request)
        {
            var paper = await db.Papers
                .Include(a => a.Teacher)
                .Include(a => a.Congress)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (paper is null) return null;

            var teacher = paper.TeacherId == request.TeacherId
                ? paper.Teacher
                : await db.Teachers.FindAsync(request.TeacherId);
            if (teacher is null) return null;

            var congress = paper.CongressId == request.CongressId
                ? paper.Congress
                : await db.Congresses.FindAsync(request.CongressId);
            if (congress is null) return null;

            paper.Title = request.Title;
            paper.YearOfPublication = request.YearOfPublication;
            paper.Description = request.Description;
            paper.Keywords = request.Keywords;
            paper.Authors = request.Authors;
            paper.Base = request.Base;
            paper.TeacherId = request.TeacherId;
            paper.CongressId = request.CongressId;

            await db.SaveChangesAsync();

            return new PaperResponse(
                paper.Id,
                paper.Title,
                paper.YearOfPublication,
                paper.Description,
                paper.Keywords,
                paper.Authors,
                paper.Base,
                new TeacherResponse(
                    teacher.Id,
                    teacher.Name,
                    teacher.Description,
                    teacher.Email,
                    teacher.Lattes,
                    teacher.Field,
                    teacher.AcademicDegree.ToString(),
                    teacher.ImageUrl
                ),
                new CongressResponse(
                    congress.Id,
                    congress.Title,
                    congress.Description,
                    congress.Date,
                    congress.Url,
                    congress.Location,
                    congress.Status
                )
            );
        }
    }

    [ApiController]
    [Route("api/papers")]
    public class UpdatePaperController(UpdatePaperHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, PaperRequest request, IValidator<PaperRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(id, request);
            if (result is null) return NotFound();

            return Ok(result);
        }
    }
}
