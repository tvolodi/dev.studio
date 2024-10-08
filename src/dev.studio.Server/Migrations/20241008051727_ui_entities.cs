using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace dev.studio.Server.Migrations
{
    /// <inheritdoc />
    public partial class ui_entities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:hstore", ",,");

            migrationBuilder.CreateTable(
                name: "CodeTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TemplateBody = table.Column<string>(type: "text", nullable: true),
                    TemplateFileName = table.Column<string>(type: "text", nullable: true),
                    UseFileTemplate = table.Column<bool>(type: "boolean", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CodeTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UIComponents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ComponentName = table.Column<string>(type: "text", nullable: true),
                    ComponentLibrary = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Properties = table.Column<string>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UIComponents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UIPages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InlineCodeTemplate = table.Column<string>(type: "text", nullable: true),
                    CodeTemplateId = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UIPages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UIPages_CodeTemplates_CodeTemplateId",
                        column: x => x.CodeTemplateId,
                        principalTable: "CodeTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UIPagesAreas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OrderNumber = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    UIPageId = table.Column<int>(type: "integer", nullable: true),
                    CodeTemplateId = table.Column<int>(type: "integer", nullable: true),
                    InlineCodeTemplate = table.Column<string>(type: "text", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UIPagesAreas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UIPagesAreas_CodeTemplates_CodeTemplateId",
                        column: x => x.CodeTemplateId,
                        principalTable: "CodeTemplates",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UIPagesAreas_UIPages_UIPageId",
                        column: x => x.UIPageId,
                        principalTable: "UIPages",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UIFields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: true),
                    UIPageAreaId = table.Column<int>(type: "integer", nullable: true),
                    ComponentId = table.Column<int>(type: "integer", nullable: true),
                    ModelVarName = table.Column<string>(type: "text", nullable: true),
                    SetModelVarFunctionName = table.Column<string>(type: "text", nullable: true),
                    Properties = table.Column<Dictionary<string, string>>(type: "hstore", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UIFields", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UIFields_UIComponents_ComponentId",
                        column: x => x.ComponentId,
                        principalTable: "UIComponents",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UIFields_UIPagesAreas_UIPageAreaId",
                        column: x => x.UIPageAreaId,
                        principalTable: "UIPagesAreas",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UIFields_ComponentId",
                table: "UIFields",
                column: "ComponentId");

            migrationBuilder.CreateIndex(
                name: "IX_UIFields_UIPageAreaId",
                table: "UIFields",
                column: "UIPageAreaId");

            migrationBuilder.CreateIndex(
                name: "IX_UIPages_CodeTemplateId",
                table: "UIPages",
                column: "CodeTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_UIPagesAreas_CodeTemplateId",
                table: "UIPagesAreas",
                column: "CodeTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_UIPagesAreas_UIPageId",
                table: "UIPagesAreas",
                column: "UIPageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UIFields");

            migrationBuilder.DropTable(
                name: "UIComponents");

            migrationBuilder.DropTable(
                name: "UIPagesAreas");

            migrationBuilder.DropTable(
                name: "UIPages");

            migrationBuilder.DropTable(
                name: "CodeTemplates");

            migrationBuilder.AlterDatabase()
                .OldAnnotation("Npgsql:PostgresExtension:hstore", ",,");
        }
    }
}
