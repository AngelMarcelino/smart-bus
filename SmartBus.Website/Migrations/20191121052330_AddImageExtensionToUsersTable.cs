using Microsoft.EntityFrameworkCore.Migrations;

namespace SmartBus.Website.Migrations
{
    public partial class AddImageExtensionToUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageExtension",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageExtension",
                table: "AspNetUsers");
        }
    }
}
