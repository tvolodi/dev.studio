using server_ext.DAL.BaseEntities;
using System.Text.Json;

namespace dev.studio.Server.DAL.Models
{
    public class SystemConfig : BaseEntity
    {
        public string? SimpleValue { get; set; }
        public JsonDocument? Value { get; set; }

    }
}
