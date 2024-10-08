using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class UIField : BaseEntity
    {

        public int? Order { get; set; }
        public UIPageArea? UIPageArea { get; set; }
        public int? UIPageAreaId { get; set; }
        public UIComponent? Component { get; set; }
        public int? ComponentId { get; set; }
        public string? ModelVarName { get; set; }
        public string? SetModelVarFunctionName { get; set; }
        public Dictionary<string, string>? Properties { get; set; }
        //public List<FieldOption>? FieldOptions { get; set; }
    }

    public class FieldOption
    {
        public string OptionName { get; set; }
        public string OptionValue { get; set; }
    }
}
