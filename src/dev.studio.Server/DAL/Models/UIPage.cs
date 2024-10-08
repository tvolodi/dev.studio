using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class UIPage: BaseEntity
    {
        public string? InlineCodeTemplate { get; set; }
        public CodeTemplate CodeTemplate { get; set; }        
        public int CodeTemplateId { get; set; }
        public string? Url { get; set; }

        public virtual List<UIPageArea> UIPageAreas { get; set; } = new List<UIPageArea>();
    } 
}
