using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Editais.Shared;

namespace VitrineAPI.Features.Editais.Endpoints
{
    public class UpdateEditalHandler(AppDbContext db)
    {
        public async Task<EditalResponse?> Handle(Guid id, EditalRequest request)
        {
            var edital = await db.Editais.FindAsync(id);
            if (edital is null) return null;

            edital.Title = request.Title;
            edital.Description = request.Description;
            edital.ImageUrl = request.ImageUrl;
            edital.Link = request.Link;
            edital.Status = Enum.Parse<EditalStatus>(request.Status!);

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
    public class UpdateEditalController(UpdateEditalHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, EditalRequest request, IValidator<EditalRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(id, request);
            if (result is null) return NotFound();

            return Ok(result);
        }
    }
}
