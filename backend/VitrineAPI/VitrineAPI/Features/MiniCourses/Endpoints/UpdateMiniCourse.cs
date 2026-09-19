using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.MiniCourses.Shared;

namespace VitrineAPI.Features.MiniCourses.Endpoints
{
    public class UpdateMiniCourseHandler(AppDbContext db)
    {
        public async Task<MiniCourseResponse?> Handle(Guid id, MiniCourseRequest request)
        {
            var miniCourse = await db.MiniCourses.FindAsync(id);
            if (miniCourse is null) return null;

            miniCourse.Title = request.Title;
            miniCourse.Description = request.Description;
            miniCourse.Organizers = request.Organizers;
            miniCourse.TargetAudience = Enum.Parse<MiniCourseTargetAudience>(request.TargetAudience!);

            await db.SaveChangesAsync();

            return new MiniCourseResponse(
                miniCourse.Id,
                miniCourse.Title,
                miniCourse.Description,
                miniCourse.Organizers,
                miniCourse.TargetAudience
            );
        }
    }

    [ApiController]
    [Route("api/minicourses")]
    public class UpdateMiniCourseController(UpdateMiniCourseHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, MiniCourseRequest request, IValidator<MiniCourseRequest> validator)
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