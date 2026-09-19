using System.Text.Json.Serialization;

namespace VitrineAPI.Database.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CongressStatus
    {
        Em_andamento,
        Finalizado,
        A_ser_publicado
    }
}
