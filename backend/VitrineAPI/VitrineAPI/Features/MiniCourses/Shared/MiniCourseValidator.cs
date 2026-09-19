using FluentValidation;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.MiniCourses.Shared
{
    public class MiniCourseRequestValidator : AbstractValidator<MiniCourseRequest>
    {
        public MiniCourseRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(50).WithMessage("Title must be at most 50 characters");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required")
                .MaximumLength(300).WithMessage("Description must be at most 300 characters"); 

            RuleFor(x => x.Organizers)
                .NotEmpty().WithMessage("Organizers is required")
                .MaximumLength(300).WithMessage("Organizers must be at most 300 characters");

            RuleFor(x => x.TargetAudience)
                .NotEmpty().WithMessage("Target audience is required")
                .Must(c => Enum.TryParse<MiniCourseTargetAudience>(c, out _))
                .WithMessage("Invalid target audience. Valid values: Interno, Externo");
        }
    }
}