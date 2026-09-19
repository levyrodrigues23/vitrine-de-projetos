using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;

namespace VitrineAPI.Features.MiniCourses.Endpoints
{
    public class DeleteMiniCourseHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var miniCourse = await db.MiniCourses.FindAsync(id);
            if (miniCourse is null) return false;

            db.MiniCourses.Remove(miniCourse);
            await db.SaveChangesAsync();

            return true;
        }
    }

    [ApiController]
    [Route("api/minicourses")]
    public class DeleteMiniCourseController(DeleteMiniCourseHandler handler) : ControllerBase
    {
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await handler.Handle(id);
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}