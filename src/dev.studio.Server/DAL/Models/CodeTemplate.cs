using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class CodeTemplate: BaseEntity
    {
        public string? TemplateBody { get; set; }
        public string? TemplateFileName { get; set; }
        public bool UseFileTemplate { get; set; }
    }
}
