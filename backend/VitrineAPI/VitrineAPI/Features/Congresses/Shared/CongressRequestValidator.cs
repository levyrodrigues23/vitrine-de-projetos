using FluentValidation;
using VitrineAPI.Database.Models.Enums;

namespace VitrineAPI.Features.Congresses.Shared
{
    public class CongressRequestValidator : AbstractValidator<CongressRequest>
    {
        public CongressRequestValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.");

            // At that time this field is a string, so the back-end is not validating the date format.
            // If necessary, we can implement a custom validation rule to check if the date is in a valid format.
            // Or change to DateTime type and let the model binding handle the validation.
            RuleFor(x => x.Date) 
                .NotEmpty().WithMessage("Date is required.");

            RuleFor(x => x.Url)
                .NotEmpty().WithMessage("Url is required.");

            RuleFor(x => x.Location)
                .NotEmpty().WithMessage("Location is required.");

            RuleFor(x => x.Status)
                .NotEmpty().WithMessage("Status is required")
                .Must(c => Enum.TryParse<CongressStatus>(c, out _))
                .WithMessage("Invalid Status. Valid values: Em_andamento, Finalizado, A_ser_publicado");
        }
    }
}