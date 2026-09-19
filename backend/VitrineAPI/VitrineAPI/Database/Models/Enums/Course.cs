using System.Text.Json.Serialization;

namespace VitrineAPI.Database.Models.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Course
    {
        Analise_e_Desenvolvimento_de_Sistemas,
        Seguranca_da_Informacao,
        Ciencia_de_Dados,
        Teatro
    }
}
