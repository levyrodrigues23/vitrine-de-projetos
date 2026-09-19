using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VitrineAPI.Migrations
{
    /// <inheritdoc />
    public partial class RenameStartupToStartupsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Startup",
                table: "Startup");

            migrationBuilder.RenameTable(
                name: "Startup",
                newName: "Startups");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Startups",
                table: "Startups",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Startups",
                table: "Startups");

            migrationBuilder.RenameTable(
                name: "Startups",
                newName: "Startup");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Startup",
                table: "Startup",
                column: "Id");
        }
    }
}
