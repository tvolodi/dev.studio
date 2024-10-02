using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class UIPage: BaseEntity
    {
        public CodeTemplate CodeTemplate { get; set; }
        public string? InlineCodeTemplate { get; set; }
        public int CodeTemplateId { get; set; }
        public string? Url { get; set; }

        public virtual List<UIPage> UIScreens { get; set; } = new List<UIPage>();
    } 
}
