using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class cartname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Cart",
                newName: "Name");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_Email",
                table: "Cart",
                newName: "IX_Cart_Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Cart",
                newName: "Email");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_Name",
                table: "Cart",
                newName: "IX_Cart_Email");
        }
    }
}
