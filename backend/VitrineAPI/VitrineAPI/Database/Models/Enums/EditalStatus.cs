using System.Text.Json.Serialization;

namespace VitrineAPI.Database.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum EditalStatus
    {
        Andamento,
        Finalizado,
        A_ser_publicado
    }
}
