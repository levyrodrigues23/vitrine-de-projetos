using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;

namespace VitrineAPI.Features.Papers.Endpoints
{
    public class DeletePaperHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var paper = await db.Papers.FindAsync(id);
            if (paper is null) return false;

            db.Papers.Remove(paper);
            await db.SaveChangesAsync();

            return true;
        }
    }

    [ApiController]
    [Route("api/papers")]
    public class DeletePaperController(DeletePaperHandler handler) : ControllerBase
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
