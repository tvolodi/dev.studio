using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class UIComponent: BaseEntity
    {
        public string? ComponentName { get; set; }
        public string? ComponentLibrary { get; set; }

        public Dictionary<string, string>? Properties { get; set; }
    }
}
