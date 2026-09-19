using FluentValidation;

namespace VitrineAPI.Features.JrCompanyProjects.Shared
{
    public class JrCompanyProjectRequestValidator : AbstractValidator<JrCompanyProjectRequest>
    {
        public JrCompanyProjectRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(50).WithMessage("Title must be at most 50 characters");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(300).WithMessage("Description must be at most 300 characters");

            RuleFor(x => x.ImageUrl)
                .NotEmpty().WithMessage("Image URL is required")
                .Must(url => Uri.IsWellFormedUriString(url, UriKind.Absolute))
                .WithMessage("Invalid image URL format");

            RuleFor(x => x.CompanyName)
                .NotEmpty().WithMessage("Company name is required")
                .MaximumLength(100).WithMessage("Company name must be at most 100 characters");

            RuleFor(x => x.Contact)
                .NotEmpty().WithMessage("Contact is required")
                .MaximumLength(100).WithMessage("Contact must be at most 100 characters");
        }
    }
}
