using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Database.Models;
using VitrineAPI.Features.Startups.Shared;

namespace VitrineAPI.Features.Startups.Endpoints
{
    public class CreateStartupHandler(AppDbContext db)
    {
        public async Task<StartupResponse> Handle(StartupRequest request)
        {
            var startup = new Startup
            {
                Title = request.Title,
                Description = request.Description,
                ImageUrl = request.ImageUrl,
                Category = request.Category,
                Contact = request.Contact
            };

            await db.AddAsync(startup);
            await db.SaveChangesAsync();

            return new StartupResponse(
                startup.Id,
                startup.Title,
                startup.Description,
                startup.ImageUrl,
                startup.Category,
                startup.Contact
            );
        }
    }

    [ApiController]
    [Route("api/startups")]
    public class CreateStartupController(CreateStartupHandler handler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(StartupRequest request, IValidator<StartupRequest> validator)
        {
            var validation = await validator.ValidateAsync(request);
            if (!validation.IsValid)
                return BadRequest(validation.ToDictionary());

            var result = await handler.Handle(request);
            return Created($"/api/startups/{result.Id}", result);
        }
    }
}
