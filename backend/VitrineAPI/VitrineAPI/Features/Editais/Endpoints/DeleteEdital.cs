using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;

namespace VitrineAPI.Features.Editais.Endpoints
{
    public class DeleteEditalHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var edital = await db.Editais.FindAsync(id);
            if (edital is null) return false;

            db.Editais.Remove(edital);
            await db.SaveChangesAsync();

            return true;
        }
    }

    [ApiController]
    [Route("api/editais")]
    public class DeleteEditalController(DeleteEditalHandler handler) : ControllerBase
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
