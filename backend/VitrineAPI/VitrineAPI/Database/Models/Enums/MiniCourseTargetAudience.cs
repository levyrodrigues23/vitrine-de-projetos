using System.Text.Json.Serialization;

namespace VitrineAPI.Database.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum MiniCourseTargetAudience
    {
        Interno,
        Externo
    }
}
