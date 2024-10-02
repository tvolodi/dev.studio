using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dev.studio.Server.Migrations
{
    /// <inheritdoc />
    public partial class AppEntityAttr_ExtRef : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DbColumnDefaultValue",
                table: "AppEntityAttributes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DbColumnLength",
                table: "AppEntityAttributes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DbColumnPrecision",
                table: "AppEntityAttributes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExtReferenceId",
                table: "AppEntityAttributes",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppEntityAttributes_ExtReferenceId",
                table: "AppEntityAttributes",
                column: "ExtReferenceId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntityAttributes_AppEntityAttributes_ExtReferenceId",
                table: "AppEntityAttributes",
                column: "ExtReferenceId",
                principalTable: "AppEntityAttributes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntityAttributes_AppEntityAttributes_ExtReferenceId",
                table: "AppEntityAttributes");

            migrationBuilder.DropIndex(
                name: "IX_AppEntityAttributes_ExtReferenceId",
                table: "AppEntityAttributes");

            migrationBuilder.DropColumn(
                name: "DbColumnDefaultValue",
                table: "AppEntityAttributes");

            migrationBuilder.DropColumn(
                name: "DbColumnLength",
                table: "AppEntityAttributes");

            migrationBuilder.DropColumn(
                name: "DbColumnPrecision",
                table: "AppEntityAttributes");

            migrationBuilder.DropColumn(
                name: "ExtReferenceId",
                table: "AppEntityAttributes");
        }
    }
}
