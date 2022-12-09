using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class shipmentitemorderitem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Product_ProductId",
                table: "OrderItem");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Unit_UnitId",
                table: "OrderItem");

            migrationBuilder.DropForeignKey(
                name: "FK_ShipmentItem_Product_ProductId",
                table: "ShipmentItem");

            migrationBuilder.DropForeignKey(
                name: "FK_ShipmentItem_Unit_UnitId",
                table: "ShipmentItem");

            migrationBuilder.DropIndex(
                name: "IX_ShipmentItem_ProductId",
                table: "ShipmentItem");

            migrationBuilder.DropIndex(
                name: "IX_ShipmentItem_UnitId",
                table: "ShipmentItem");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ShipmentItem");

            migrationBuilder.DropColumn(
                name: "UnitId",
                table: "ShipmentItem");

            migrationBuilder.AddColumn<int>(
                name: "OrderItemId",
                table: "ShipmentItem",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentItem_OrderItemId",
                table: "ShipmentItem",
                column: "OrderItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Product_ProductId",
                table: "OrderItem",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Unit_UnitId",
                table: "OrderItem",
                column: "UnitId",
                principalTable: "Unit",
                principalColumn: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShipmentItem_OrderItem_OrderItemId",
                table: "ShipmentItem",
                column: "OrderItemId",
                principalTable: "OrderItem",
                principalColumn: "OrderItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Product_ProductId",
                table: "OrderItem");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Unit_UnitId",
                table: "OrderItem");

            migrationBuilder.DropForeignKey(
                name: "FK_ShipmentItem_OrderItem_OrderItemId",
                table: "ShipmentItem");

            migrationBuilder.DropIndex(
                name: "IX_ShipmentItem_OrderItemId",
                table: "ShipmentItem");

            migrationBuilder.DropColumn(
                name: "OrderItemId",
                table: "ShipmentItem");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "ShipmentItem",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UnitId",
                table: "ShipmentItem",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentItem_ProductId",
                table: "ShipmentItem",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentItem_UnitId",
                table: "ShipmentItem",
                column: "UnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Product_ProductId",
                table: "OrderItem",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Unit_UnitId",
                table: "OrderItem",
                column: "UnitId",
                principalTable: "Unit",
                principalColumn: "UnitId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShipmentItem_Product_ProductId",
                table: "ShipmentItem",
                column: "ProductId",
                principalTable: "Product",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShipmentItem_Unit_UnitId",
                table: "ShipmentItem",
                column: "UnitId",
                principalTable: "Unit",
                principalColumn: "UnitId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
