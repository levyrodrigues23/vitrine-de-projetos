using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Editais.Shared;

namespace VitrineAPI.Features.Editais.Endpoints
{
    public class CreateEditalHandler(AppDbContext db)
    {
        public async Task<EditalResponse> Handle(EditalRequest request)
        {
            var edital = new Edital
            {
                Title = request.Title,
                Description = request.Description,
                ImageUrl = request.ImageUrl,
                Link = request.Link,
                Status = Enum.Parse<EditalStatus>(request.Status!),
            };

            await db.Editais.AddAsync(edital);
            await db.SaveChangesAsync();

            return new EditalResponse(
                edital.Id,
                edital.Title,
                edital.Description,
                edital.ImageUrl,
                edital.Link,
                edital.Status
            );
        }
    }

    [ApiController]
    [Route("api/editais")]
    public class CreateEditalController(CreateEditalHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(EditalRequest request, IValidator<EditalRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            return Created($"/api/editais/{result.Id}", result);
        }
    }
}
