using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Database.Models.Enums;
using VitrineAPI.Features.Congresses.Shared;

namespace VitrineAPI.Features.Congresses.Endpoints
{
    public class CreateCongressHandler(AppDbContext db)
    {
        public async Task<CongressResponse> Handle(CongressRequest request)
        {
            var congress = new Congress
            {
                Title = request.Title,
                Description = request.Description,
                Date = request.Date,
                Url = request.Url,
                Location = request.Location,
                Status = Enum.Parse<CongressStatus>(request.Status!),
            };

            await db.Congresses.AddAsync(congress);
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
    public class CreateCongressController(CreateCongressHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(CongressRequest request, IValidator<CongressRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            return Created($"/api/congresses/{result.Id}", result);
        }
    }
}