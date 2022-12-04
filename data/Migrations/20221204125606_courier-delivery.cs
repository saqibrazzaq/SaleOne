using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class courierdelivery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderAddress_Order_OrderId",
                table: "OrderAddress");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "OrderAddress",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Courier",
                columns: table => new
                {
                    CourierId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courier", x => x.CourierId);
                });

            migrationBuilder.CreateTable(
                name: "DeliveryPlan",
                columns: table => new
                {
                    DeliveryPlanId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourierId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fee = table.Column<decimal>(type: "decimal(12,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryPlan", x => x.DeliveryPlanId);
                    table.ForeignKey(
                        name: "FK_DeliveryPlan_Courier_CourierId",
                        column: x => x.CourierId,
                        principalTable: "Courier",
                        principalColumn: "CourierId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryPlan_CourierId",
                table: "DeliveryPlan",
                column: "CourierId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderAddress_Order_OrderId",
                table: "OrderAddress",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderAddress_Order_OrderId",
                table: "OrderAddress");

            migrationBuilder.DropTable(
                name: "DeliveryPlan");

            migrationBuilder.DropTable(
                name: "Courier");

            migrationBuilder.AlterColumn<int>(
                name: "OrderId",
                table: "OrderAddress",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderAddress_Order_OrderId",
                table: "OrderAddress",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId");
        }
    }
}
