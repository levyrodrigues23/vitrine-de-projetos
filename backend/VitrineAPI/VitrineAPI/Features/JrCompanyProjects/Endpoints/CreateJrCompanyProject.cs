using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Features.JrCompanyProjects.Shared;

namespace VitrineAPI.Features.JrCompanyProjects.Endpoints
{
    public class CreateJrCompanyProjectHandler(AppDbContext db)
    {
        public async Task<JrCompanyProjectResponse> Handle(JrCompanyProjectRequest request)
        {
            var jrCompanyProject = new JrCompanyProject
            {
                Title = request.Title,
                Description = request.Description,
                ImageUrl = request.ImageUrl,
                CompanyName = request.CompanyName,
                Contact = request.Contact
            };

            await db.AddAsync(jrCompanyProject);
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
    public class CreateJrCompanyProjectController(CreateJrCompanyProjectHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(JrCompanyProjectRequest request, IValidator<JrCompanyProjectRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            return Created($"/api/jr-company-projects/{result.Id}", result);
        }
    }
}
