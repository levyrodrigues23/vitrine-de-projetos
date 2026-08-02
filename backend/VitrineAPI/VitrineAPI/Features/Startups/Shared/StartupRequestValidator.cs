using FluentValidation;

namespace VitrineAPI.Features.Startups.Shared
{
    public class StartupRequestValidator : AbstractValidator<StartupRequest>
    {
        public StartupRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(50).WithMessage("Title must be at most 50 characters");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(300).WithMessage("Description must be at most 300 characters");

            RuleFor(x => x.Category)
                .NotEmpty().WithMessage("Category is required")
                .MaximumLength(50).WithMessage("Category must be at most 50 characters");

            RuleFor(x => x.Contact)
                .NotEmpty().WithMessage("Contact is required")
                .MaximumLength(100).WithMessage("Contact must be at most 100 characters");
        }
    }
}