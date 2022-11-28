using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class orderuserid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_AspNetUsers_Username",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Order",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_Username",
                table: "Order",
                newName: "IX_Order_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_AspNetUsers_UserId",
                table: "Order",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_AspNetUsers_UserId",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Order",
                newName: "Username");

            migrationBuilder.RenameIndex(
                name: "IX_Order_UserId",
                table: "Order",
                newName: "IX_Order_Username");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_AspNetUsers_Username",
                table: "Order",
                column: "Username",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
