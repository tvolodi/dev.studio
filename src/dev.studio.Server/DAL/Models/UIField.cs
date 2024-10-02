using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class UIField : BaseEntity
    {
        public string? ComponentName { get; set; }
        public string? ComponentLibrary { get; set; }
        public string? ModelVarName { get; set; }
        public string? SetModelVarFunctionName { get; set; }
        public List<FieldOption>? FieldOptions { get; set; }
    }

    public class FieldOption
    {
        public string OptionName { get; set; }
        public string OptionValue { get; set; }
    }
}
