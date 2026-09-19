using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using VitrineAPI.Database;
using VitrineAPI.Features.Startups.Shared;

namespace VitrineAPI.Features.Startups.Endpoints
{
    public class UpdateStartupHandler(AppDbContext db)
    {
        public async Task<StartupResponse?> Handle(Guid id, StartupRequest request)
        {
            var startup = await db.Startups.FindAsync(id);
            if (startup is null) return null;

            startup.Title = request.Title;
            startup.Description = request.Description;
            startup.ImageUrl = request.ImageUrl;
            startup.Category = request.Category;
            startup.Contact = request.Contact;

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
    public class UpdateStartupController(UpdateStartupHandler handler) : ControllerBase
    {
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, StartupRequest request, IValidator<StartupRequest> validator)
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