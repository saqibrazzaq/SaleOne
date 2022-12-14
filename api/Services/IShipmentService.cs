using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface IShipmentService
    {
        ApiOkPagedResponse<IEnumerable<ShipmentRes>, MetaData> Search(ShipmentReqSearch dto);
        ApiOkPagedResponse<IEnumerable<ShipmentItemRes>, MetaData> SearchShipmentItems(ShipmentItemReqSearch dto);
        ShipmentRes Get(int shipmentId);
        ShipmentRes Create(ShipmentReqCreate dto);
        ShipmentRes Update(int shipmentId, ShipmentReqEdit dto);
        void Delete(int shipmentId);
        ShipmentItemRes GetShipmentItem(int shipmentItemId);
        ShipmentItemRes CreateShipmentItem(ShipmentItemReqEdit dto);
        ShipmentItemRes UpdateShipmentItem(int shipmentItemId, ShipmentItemReqEdit dto);
        void DeleteShipmentItem(int shipmentItemId);
        ShipmentRes CreateFromOrder(int orderId);
    }
}
