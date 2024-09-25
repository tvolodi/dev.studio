using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class AppDataType: BaseEntity
    {
        public string? PgType { get; set; }
    }
}
