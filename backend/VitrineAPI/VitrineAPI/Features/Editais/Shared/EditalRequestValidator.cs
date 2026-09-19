using FluentValidation;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Editais.Shared
{
    public class EditalRequestValidator : AbstractValidator<EditalRequest>
    {
        public EditalRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(150).WithMessage("Title must be at most 150 characters.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(500).WithMessage("Description must be at most 500 characters.");

            RuleFor(x => x.ImageUrl)
                .MaximumLength(300).WithMessage("ImageUrl must be at most 300 characters.");

            RuleFor(x => x.Link)
                .NotEmpty().WithMessage("Link is required.");

            RuleFor(x => x.Status)
                .NotEmpty().WithMessage("Status is required")
                .Must(c => Enum.TryParse<EditalStatus>(c, out _))
                .WithMessage("Invalid Status. Valid values: Andamento, Finalizado, A_ser_publicado");
        }
    }
}
