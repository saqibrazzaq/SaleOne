using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class shipment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ShippedQuantity",
                table: "OrderItem",
                type: "decimal(12,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "ShipmentAddress",
                columns: table => new
                {
                    ShipmentAddressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    Line1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Line2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShipmentAddress", x => x.ShipmentAddressId);
                    table.ForeignKey(
                        name: "FK_ShipmentAddress_City_CityId",
                        column: x => x.CityId,
                        principalTable: "City",
                        principalColumn: "CityId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Shipment",
                columns: table => new
                {
                    ShipmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    TrackingNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeliveryPlanId = table.Column<int>(type: "int", nullable: false),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ShipmentAddressId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipment", x => x.ShipmentId);
                    table.ForeignKey(
                        name: "FK_Shipment_DeliveryPlan_DeliveryPlanId",
                        column: x => x.DeliveryPlanId,
                        principalTable: "DeliveryPlan",
                        principalColumn: "DeliveryPlanId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shipment_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shipment_ShipmentAddress_ShipmentAddressId",
                        column: x => x.ShipmentAddressId,
                        principalTable: "ShipmentAddress",
                        principalColumn: "ShipmentAddressId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShipmentItem",
                columns: table => new
                {
                    ShipmentItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShipmentId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(12,2)", nullable: false),
                    UnitId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShipmentItem", x => x.ShipmentItemId);
                    table.ForeignKey(
                        name: "FK_ShipmentItem_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShipmentItem_Shipment_ShipmentId",
                        column: x => x.ShipmentId,
                        principalTable: "Shipment",
                        principalColumn: "ShipmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShipmentItem_Unit_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Unit",
                        principalColumn: "UnitId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Shipment_DeliveryPlanId",
                table: "Shipment",
                column: "DeliveryPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Shipment_OrderId",
                table: "Shipment",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Shipment_ShipmentAddressId",
                table: "Shipment",
                column: "ShipmentAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentAddress_CityId",
                table: "ShipmentAddress",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentItem_ProductId",
                table: "ShipmentItem",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentItem_ShipmentId",
                table: "ShipmentItem",
                column: "ShipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ShipmentItem_UnitId",
                table: "ShipmentItem",
                column: "UnitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShipmentItem");

            migrationBuilder.DropTable(
                name: "Shipment");

            migrationBuilder.DropTable(
                name: "ShipmentAddress");

            migrationBuilder.DropColumn(
                name: "ShippedQuantity",
                table: "OrderItem");
        }
    }
}
