using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Graduates.Shared;

namespace VitrineAPI.Features.Graduates.Endpoints
{
    public class CreateGraduateHandler(AppDbContext db)
    {
        public async Task<GraduateResponse> Handle(GraduateRequest request)
        {
            var graduate = new Graduate
            {
                Name = request.Name,
                Description = request.Description,
                GraduationYear = request.GraduationYear,
                Contact = request.Contact,
                Course = Enum.Parse<Course>(request.Course!),
            };

            await db.Graduates.AddAsync(graduate);
            await db.SaveChangesAsync();

            return new GraduateResponse(
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
    public class CreateGraduateController(CreateGraduateHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(GraduateRequest request, IValidator<GraduateRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            return Created($"/api/graduates/{result.Id}", result);
        }
    }
}
