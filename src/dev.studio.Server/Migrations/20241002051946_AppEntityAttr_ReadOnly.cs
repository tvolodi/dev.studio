using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dev.studio.Server.Migrations
{
    /// <inheritdoc />
    public partial class AppEntityAttr_ReadOnly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntityAttributes_AppDataTypes_AppDataTypeId",
                table: "AppEntityAttributes");

            migrationBuilder.DropForeignKey(
                name: "FK_AppEntityAttributes_AppEntities_AppEntityId",
                table: "AppEntityAttributes");

            migrationBuilder.AlterColumn<bool>(
                name: "IsUnique",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<bool>(
                name: "IsSearchable",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<bool>(
                name: "IsPrimaryKey",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<bool>(
                name: "IsNullable",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "AppEntityAttributes",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "AppEntityId",
                table: "AppEntityAttributes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "AppDataTypeId",
                table: "AppEntityAttributes",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntityAttributes_AppDataTypes_AppDataTypeId",
                table: "AppEntityAttributes",
                column: "AppDataTypeId",
                principalTable: "AppDataTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntityAttributes_AppEntities_AppEntityId",
                table: "AppEntityAttributes",
                column: "AppEntityId",
                principalTable: "AppEntities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppEntityAttributes_AppDataTypes_AppDataTypeId",
                table: "AppEntityAttributes");

            migrationBuilder.DropForeignKey(
                name: "FK_AppEntityAttributes_AppEntities_AppEntityId",
                table: "AppEntityAttributes");

            migrationBuilder.AlterColumn<bool>(
                name: "IsUnique",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsSearchable",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsPrimaryKey",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsNullable",
                table: "AppEntityAttributes",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "AppEntityAttributes",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AppEntityId",
                table: "AppEntityAttributes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AppDataTypeId",
                table: "AppEntityAttributes",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntityAttributes_AppDataTypes_AppDataTypeId",
                table: "AppEntityAttributes",
                column: "AppDataTypeId",
                principalTable: "AppDataTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppEntityAttributes_AppEntities_AppEntityId",
                table: "AppEntityAttributes",
                column: "AppEntityId",
                principalTable: "AppEntities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
