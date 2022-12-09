using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data.Migrations
{
    public partial class shipmentdeliveryplanoptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shipment_DeliveryPlan_DeliveryPlanId",
                table: "Shipment");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryPlanId",
                table: "Shipment",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Shipment_DeliveryPlan_DeliveryPlanId",
                table: "Shipment",
                column: "DeliveryPlanId",
                principalTable: "DeliveryPlan",
                principalColumn: "DeliveryPlanId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shipment_DeliveryPlan_DeliveryPlanId",
                table: "Shipment");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryPlanId",
                table: "Shipment",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Shipment_DeliveryPlan_DeliveryPlanId",
                table: "Shipment",
                column: "DeliveryPlanId",
                principalTable: "DeliveryPlan",
                principalColumn: "DeliveryPlanId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
