using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.MiniCourses.Shared;

namespace VitrineAPI.Features.MiniCourses.Endpoints
{
    public class CreateMiniCourseHandler(AppDbContext db)
    {
        public async Task<MiniCourseResponse> Handle(MiniCourseRequest request)
        {
            var miniCourse = new MiniCourse
            {
                Title = request.Title,
                Description = request.Description,
                Organizers = request.Organizers,
                TargetAudience = Enum.Parse<MiniCourseTargetAudience>(request.TargetAudience!),
            };

            await db.MiniCourses.AddAsync(miniCourse);
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
    public class CreateMiniCourseController(CreateMiniCourseHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(MiniCourseRequest request, IValidator<MiniCourseRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            return Created($"/api/mini-courses/{result.Id}", result);
        }
    }
}
