import api from "./api";

class PaymentAPI {
  // Create Payment Intent
  static createPaymentIntent(data) {
    return api.post(`/api/payment/create-payment-intent`, data);
  }
}

export default PaymentAPI;
