import { PAYMENT_STATUS } from '@shared/enum';
import { Product } from './product';

// TODO: вынести в отдельный файл
export enum ORDER_STATUS {
  AWAITING_PAYMENT = 'awaitingPayment',
  PENDING = 'pending',
  PAYMENT_SUCCEEDED = 'paymentSucceeded',
  PAYMENT_CANCELED = 'paymentCanceled',
  IN_PROGRESS = 'inProgress',
  IN_DELIVERY_PROCESS = 'inDeliveryProcess',
  DELIVERED = 'delivered',
  // FINISHED = 'finished',
}

type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: number;
  userId: number;
  totalPrice: number;
  quantity: number;
  orderStatus: ORDER_STATUS;
  paymentStatus: PAYMENT_STATUS;
  paymentUrl: string;
  transactionId: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};
