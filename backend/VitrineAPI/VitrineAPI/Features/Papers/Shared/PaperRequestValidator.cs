using FluentValidation;

namespace VitrineAPI.Features.Papers.Shared
{
    public class PaperRequestValidator : AbstractValidator<PaperRequest>
    {
        public PaperRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(150).WithMessage("Title must be at most 150 characters.");

            RuleFor(x => x.YearOfPublication)
                .GreaterThan(0).WithMessage("YearOfPublication must be a valid year.")
                .LessThanOrEqualTo(DateTime.UtcNow.Year).WithMessage("YearOfPublication cannot be in the future.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(500).WithMessage("Description must be at most 500 characters.");

            RuleFor(x => x.Keywords)
                .MaximumLength(200).WithMessage("Keywords must be at most 200 characters.");

            RuleFor(x => x.Authors)
                .NotEmpty().WithMessage("Authors is required.");

            RuleFor(x => x.Base)
                .NotEmpty().WithMessage("Base is required.");

            RuleFor(x => x.TeacherId)
                .NotEmpty().WithMessage("TeacherId is required.");

            RuleFor(x => x.CongressId)
                .NotEmpty().WithMessage("CongressId is required.");
        }
    }
}
