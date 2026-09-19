using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;

namespace VitrineAPI.Features.Congresses.Endpoints
{
    public class DeleteCongressHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var congress = await db.Congresses.FindAsync(id);
            if (congress is null) return false;

            db.Congresses.Remove(congress);
            await db.SaveChangesAsync();

            return true;
        }
    }

    [ApiController]
    [Route("api/congresses")]
    public class DeleteCongressController(DeleteCongressHandler handler) : ControllerBase
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