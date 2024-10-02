using server_ext.DAL.BaseEntities;

namespace dev.studio.Server.DAL.Models
{
    public class AppEntityAttribute : BaseEntity
    {
        public AppDataType? AppDataType { get; set; }
        public int? AppDataTypeId { get; set; }
        public string? Description { get; set; } = string.Empty;
        public bool? IsNullable { get; set; } = true;
        public bool? IsUnique { get; set; } = false;
        public bool? IsSearchable { get; set; } = false;
        public bool? IsPrimaryKey { get; set; } = false;
        // public bool IsVisible { get; set; }
        // public bool IsReadOnly { get; set; }
        // public bool IsSystem { get; set; }
        // public bool IsDeleted { get; set; }
        public AppEntity? AppEntity { get; set; }
        public int? AppEntityId { get; set; }
        public string? DbColumnName { get; set; }
        public string? DbColumnDefaultValue { get; set; }
        public int? DbColumnLength { get; set; }
        public int? DbColumnPrecision { get; set; }
        public AppEntityAttribute? ExtReference { get; set; }
        public int? ExtReferenceId { get; set; }

        public AppEntityAttribute() { }
    }
}
