using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartBus.Website.Migrations
{
    public partial class RemoveColumsThatWouldLetDataRedundancy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Drivers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Drivers",
                nullable: false,
                defaultValue: "");
        }
    }
}
