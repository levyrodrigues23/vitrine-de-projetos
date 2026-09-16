using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.JrCompanyProjects.Shared;

namespace VitrineAPI.Features.JrCompanyProjects.Endpoints
{
    public class UpdateJrCompanyProjectHandler(AppDbContext db)
    {
        public async Task<JrCompanyProjectResponse?> Handle(Guid id, JrCompanyProjectRequest request)
        {
            var jrCompanyProject = await db.JrCompanyProjects.FindAsync(id);
            if (jrCompanyProject is null) return null;

            jrCompanyProject.Title = request.Title;
            jrCompanyProject.Description = request.Description;
            jrCompanyProject.ImageUrl = request.ImageUrl;
            jrCompanyProject.CompanyName = request.CompanyName;
            jrCompanyProject.Contact = request.Contact;

            await db.SaveChangesAsync();

            return new JrCompanyProjectResponse(
                jrCompanyProject.Id,
                jrCompanyProject.Title,
                jrCompanyProject.Description,
                jrCompanyProject.ImageUrl,
                jrCompanyProject.CompanyName,
                jrCompanyProject.Contact
            );
        }
    }

    [ApiController]
    [Route("api/jr-company-projects")]
    public class UpdateJrCompanyProjectController(UpdateJrCompanyProjectHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, JrCompanyProjectRequest request, IValidator<JrCompanyProjectRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.Errors);

            var result = await handler.Handle(id, request);
            if (result is null) return NotFound();
            return Ok(result);
        }
    }
}
