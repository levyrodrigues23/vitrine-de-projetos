using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Congresses.Shared;

namespace VitrineAPI.Features.Congresses.Endpoints
{
    public class UpdateCongressHandler(AppDbContext db)
    {
        public async Task<CongressResponse?> Handle(Guid id, CongressRequest request)
        {
            var congress = await db.Congresses.FindAsync(id);
            if (congress is null) return null;

            congress.Title = request.Title;
            congress.Description = request.Description;
            congress.Date = request.Date;
            congress.Url = request.Url;
            congress.Location = request.Location;
            congress.Status = Enum.Parse<CongressStatus>(request.Status!);

            await db.SaveChangesAsync();

            return new CongressResponse(
                congress.Id,
                congress.Title,
                congress.Description,
                congress.Date,
                congress.Url,
                congress.Location,
                congress.Status
            );
        }
    }

    [ApiController]
    [Route("api/congresses")]
    public class UpdateCongressController(UpdateCongressHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, CongressRequest request, IValidator<CongressRequest> validator)
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