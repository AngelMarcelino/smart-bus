using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartBus.Website.Migrations
{
    public partial class AddAvailablePlacesAndtotalPlacesColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvailablePlaces",
                table: "Buses",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalPlaces",
                table: "Buses",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailablePlaces",
                table: "Buses");

            migrationBuilder.DropColumn(
                name: "TotalPlaces",
                table: "Buses");
        }
    }
}
