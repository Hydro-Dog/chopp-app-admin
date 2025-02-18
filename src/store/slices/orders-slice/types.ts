import { ORDER_STATUS, PAYMENT_STATUS } from '@shared/index';

export type UpdateOrderDTO = {
  transactionId: string;
  orderStatus?: ORDER_STATUS;
  paymentStatus?: PAYMENT_STATUS;
};
