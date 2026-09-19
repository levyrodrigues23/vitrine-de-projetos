using FluentValidation;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Graduates.Shared
{
    public class GraduateRequestValidator : AbstractValidator<GraduateRequest>
    {
        public GraduateRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(150).WithMessage("Name must be at most 150 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(500).WithMessage("Description must be at most 500 characters.");

            RuleFor(x => x.GraduationYear)
                .NotEmpty().WithMessage("GraduationYear is required.");

            RuleFor(x => x.Contact)
                .NotEmpty().WithMessage("Contact is required.");

            RuleFor(x => x.Course)
                .NotEmpty().WithMessage("Course is required")
                .Must(c => Enum.TryParse<Course>(c, out _))
                .WithMessage("Invalid Course. Valid values: Analise_e_Desenvolvimento_de_Sistemas, Seguranca_da_Informacao, Ciencia_de_Dados, Teatro");
        }
    }
}
