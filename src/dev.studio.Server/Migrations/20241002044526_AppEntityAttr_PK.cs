using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dev.studio.Server.Migrations
{
    /// <inheritdoc />
    public partial class AppEntityAttr_PK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPrimaryKey",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPrimaryKey",
                table: "AppEntityAttributes");
        }
    }
}
