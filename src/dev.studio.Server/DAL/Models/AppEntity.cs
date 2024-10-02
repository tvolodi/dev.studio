using server_ext.DAL.BaseEntities;
using System.Reflection;

namespace dev.studio.Server.DAL.Models
{
    public class AppEntity : BaseEntity
    {
        public string TableName { get; set; }
        public AppModule? AppModule { get; set; }
        public int? AppModuleId { get; set; }

        public virtual List<AppEntityAttribute>? AppEntityAttributes { get; set; }
    }
}
