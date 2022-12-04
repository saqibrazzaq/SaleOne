using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface ICourierService
    {
        ApiOkPagedResponse<IEnumerable<CourierRes>, MetaData> Search(CourierReqSearch dto);
        CourierRes Get(int courierId);
        int Count();
        CourierRes Create(CourierReqEdit dto);
        CourierRes Update(int courierId, CourierReqEdit dto);
        void Delete(int courierId);

        ApiOkPagedResponse<IEnumerable<DeliveryPlanRes>, MetaData> SearchDeliveryPlans(
            DeliveryPlanReqSearch dto);
        DeliveryPlanRes GetDeliveryPlan(int deliveryPlanId);
        int CountDeliveryPlans(int courierId);
        DeliveryPlanRes CreateDeliveryPlan(DeliveryPlanReqEdit dto);
        DeliveryPlanRes UpdateDeliveryPlan(int deliveryPlanId, DeliveryPlanReqEdit dto);
        void DeleteDeliveryPlan(int deliveryPlanId);
    }
}
