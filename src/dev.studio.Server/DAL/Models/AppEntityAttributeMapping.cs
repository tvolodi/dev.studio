using server_ext.DAL.BaseEntities;
using System.Text.Json;

namespace dev.studio.Server.DAL.Models
{
    public class AppEntityAttributeMapping: BaseEntity
    {
        public AppEntityAttribute TargetEntityAttribute { get; set; }
        public int TargetEntityAttributeId { get; set; }

        public int MappingType { get; set; }
        public string? SourceSchema { get; set; }
        public string? SourceTable { get; set; }
        public string? SourceColumn { get; set; }
        public string? SourceSqlScript { get; set; }
        public string? SourceSqlScriptType { get; set; }
        public JsonDocument? SourceExpression { get; set; }

        public void Dispose() => SourceExpression?.Dispose();


    }
}
