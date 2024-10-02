using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class AppModule : BaseEntity
    {
        public string SchemaName { get; set; }
        public string OltpModuleName { get; set; }

        public virtual List<AppEntity> AppEntities { get; set; }
    }
}
