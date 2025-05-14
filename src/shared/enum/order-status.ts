export enum ORDER_STATUS {
  AWAITING_PAYMENT = 'awaitingPayment',
  PAYMENT_SUCCEEDED = 'paymentSucceeded',
  PAYMENT_CANCELED = 'paymentCanceled',
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  IN_DELIVERY_PROCESS = 'inDeliveryProcess',
  DELIVERED = 'delivered',
  REFUNDED = 'refunded',
}
