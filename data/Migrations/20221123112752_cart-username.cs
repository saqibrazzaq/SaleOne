using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class cartusername : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cart",
                newName: "Username");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_Name",
                table: "Cart",
                newName: "IX_Cart_Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Cart",
                newName: "Name");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_Username",
                table: "Cart",
                newName: "IX_Cart_Name");
        }
    }
}
