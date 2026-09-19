using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;

namespace VitrineAPI.Features.Startups.Endpoints
{
    public class DeleteStartupHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var startup = await db.Startups.FindAsync(id);
            if (startup is null) return false;

            db.Startups.Remove(startup);
            await db.SaveChangesAsync();

            return true;
        }
    }

    [ApiController]
    [Route("api/startups")]
    public class DeleteStartupController(DeleteStartupHandler handler) : ControllerBase
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