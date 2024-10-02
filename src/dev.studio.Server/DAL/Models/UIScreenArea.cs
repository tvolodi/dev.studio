using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class UIScreenArea: BaseEntity
    {
        public int OrderNumber { get; set; }

        public string? Url { get; set; }

        public UIPage? Page { get; set; }
        public int? PageId { get; set; }

        public CodeTemplate? CodeTemplate { get; set; }
        public int? CodeTemplateId { get; set; }

        public string? InlineCodeTemplate { get; set; }

    }
}
