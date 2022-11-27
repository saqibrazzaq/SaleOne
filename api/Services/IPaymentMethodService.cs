using data.Dtos;

namespace api.Services
{
    public interface IPaymentMethodService
    {
        IEnumerable<PaymentMethodRes> GetAll();
        PaymentMethodRes Get(int paymentMethodId);
        PaymentMethodRes Create(PaymentMethodReqEdit dto);
        PaymentMethodRes Update(int paymentMethodId, PaymentMethodReqEdit dto);
        void Delete(int paymentMethodId);
    }
}
