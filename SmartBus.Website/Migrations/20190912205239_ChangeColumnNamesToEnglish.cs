using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartBus.Website.Migrations
{
    public partial class ChangeColumnNamesToEnglish : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Modelo",
                table: "Buses",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "Marca",
                table: "Buses",
                newName: "Brand");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Model",
                table: "Buses",
                newName: "Modelo");

            migrationBuilder.RenameColumn(
                name: "Brand",
                table: "Buses",
                newName: "Marca");
        }
    }
}
