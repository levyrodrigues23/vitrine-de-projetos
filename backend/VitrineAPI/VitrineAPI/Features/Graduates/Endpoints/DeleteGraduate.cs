using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;

namespace VitrineAPI.Features.Graduates.Endpoints
{
    public class DeleteGraduateHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var graduate = await db.Graduates.FindAsync(id);
            if (graduate is null) return false;

            db.Graduates.Remove(graduate);
            await db.SaveChangesAsync();

            return true;
        }
    }

    [ApiController]
    [Route("api/graduates")]
    public class DeleteGraduateController(DeleteGraduateHandler handler) : ControllerBase
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
