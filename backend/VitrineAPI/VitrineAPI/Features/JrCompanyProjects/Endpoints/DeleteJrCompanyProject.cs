using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;

namespace VitrineAPI.Features.JrCompanyProjects.Endpoints
{
    public class DeleteJrCompanyProjectHandler(AppDbContext db)
    {
        public async Task<bool> Handle(Guid id)
        {
            var jrCompanyProject = await db.JrCompanyProjects.FindAsync(id);
            if (jrCompanyProject is null) return false;

            db.JrCompanyProjects.Remove(jrCompanyProject);
            await db.SaveChangesAsync();

            return true;
        }
    }

    [ApiController]
    [Route("api/jr-company-projects")]
    public class DeleteJrCompanyProjectController(DeleteJrCompanyProjectHandler handler) : ControllerBase
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
