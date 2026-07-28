using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.MiniCourses.Shared;
using VitrineAPI.Features.Projects.Endpoints;

namespace VitrineAPI.Features.MiniCourses.Endpoints
{
    public class GetMiniCourseByIdHandler(AppDbContext db)
    {
        public async Task<MiniCourseResponse?> Handle(Guid id)
        {
            var miniCourse = await db.MiniCourses.FindAsync(id);
            if (miniCourse is null) return null;

            return new MiniCourseResponse
            (
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
    public class GetMiniCourseByIdController(GetMiniCourseByIdHandler handler) : ControllerBase
    {
        [HttpGet("{id:guid}", Name = "GetMiniCourseById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await handler.Handle(id);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }

}
