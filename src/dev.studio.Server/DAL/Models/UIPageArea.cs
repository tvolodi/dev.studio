using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class UIPageArea: BaseEntity
    {
        public int OrderNumber { get; set; }

        public string? Url { get; set; }

        public UIPage? UIPage { get; set; }
        public int? UIPageId { get; set; }

        public CodeTemplate? CodeTemplate { get; set; }
        public int? CodeTemplateId { get; set; }

        public string? InlineCodeTemplate { get; set; }

        public virtual List<UIField> UIFields { get; set; } = new List<UIField>();

    }
}
