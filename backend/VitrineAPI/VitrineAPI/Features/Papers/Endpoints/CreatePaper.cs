using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Features.Papers.Shared;
using VitrineAPI.Features.Congresses.Shared;
using VitrineAPI.Features.Teachers.Shared;

namespace VitrineAPI.Features.Papers.Endpoints
{
    public class CreatePaperHandler(AppDbContext db)
    {
        public async Task<PaperResponse?> Handle(PaperRequest request)
        {
            var teacher = await db.Teachers.FindAsync(request.TeacherId);
            if (teacher is null) return null;

            var congress = await db.Congresses.FindAsync(request.CongressId);
            if (congress is null) return null;

            var paper = new Paper
            {
                Title = request.Title,
                YearOfPublication = request.YearOfPublication,
                Description = request.Description,
                Keywords = request.Keywords,
                Authors = request.Authors,
                Base = request.Base,
                TeacherId = request.TeacherId,
                CongressId = request.CongressId
            };

            await db.Papers.AddAsync(paper);
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
    public class CreatePaperController(CreatePaperHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(PaperRequest request, IValidator<PaperRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            if (result is null) return NotFound("Teacher or Congress not found.");

            return Created($"/api/papers/{result.Id}", result);
        }
    }
}
