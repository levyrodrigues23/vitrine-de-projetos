using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Graduates.Shared;

namespace VitrineAPI.Features.Graduates.Endpoints
{
    public class UpdateGraduateHandler(AppDbContext db)
    {
        public async Task<GraduateResponse?> Handle(Guid id, GraduateRequest request)
        {
            var graduate = await db.Graduates.FindAsync(id);
            if (graduate is null) return null;

            graduate.Name = request.Name;
            graduate.Description = request.Description;
            graduate.GraduationYear = request.GraduationYear;
            graduate.Contact = request.Contact;
            graduate.Course = Enum.Parse<Course>(request.Course!);

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
    public class UpdateGraduateController(UpdateGraduateHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, GraduateRequest request, IValidator<GraduateRequest> validator)
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
