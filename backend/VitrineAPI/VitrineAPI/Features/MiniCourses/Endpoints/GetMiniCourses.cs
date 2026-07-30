using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VitrineAPI.Database;
using VitrineAPI.Features.MiniCourses.Shared;

namespace VitrineAPI.Features.MiniCourses.Endpoints
{
    public class GetMiniCoursesHandler(AppDbContext db)
    {
        public async Task<List<MiniCourseResponse>> Handle()
        {
            return await db.MiniCourses
                .Select(miniCourse => new MiniCourseResponse(
                    miniCourse.Id,
                    miniCourse.Title,
                    miniCourse.Description,
                    miniCourse.Organizers,
                    miniCourse.TargetAudience
                ))
                .ToListAsync();
        }
    }

    [ApiController]
    [Route("api/minicourses")]
    public class GetMiniCoursesController(GetMiniCoursesHandler handler) : ControllerBase
    {
        [HttpGet(Name = "GetMiniCourses")]
        public async Task<IActionResult> GetAll()
        {
            var result = await handler.Handle();
            return Ok(result);
        }
    }
}