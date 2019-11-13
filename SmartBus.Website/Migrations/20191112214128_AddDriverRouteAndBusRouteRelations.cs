using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartBus.Website.Migrations
{
    public partial class AddDriverRouteAndBusRouteRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RouteId",
                table: "Drivers",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RouteId",
                table: "Buses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_RouteId",
                table: "Drivers",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_Buses_RouteId",
                table: "Buses",
                column: "RouteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Buses_Routes_RouteId",
                table: "Buses",
                column: "RouteId",
                principalTable: "Routes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Routes_RouteId",
                table: "Drivers",
                column: "RouteId",
                principalTable: "Routes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Buses_Routes_RouteId",
                table: "Buses");

            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Routes_RouteId",
                table: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_RouteId",
                table: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Buses_RouteId",
                table: "Buses");

            migrationBuilder.DropColumn(
                name: "RouteId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "RouteId",
                table: "Buses");
        }
    }
}
