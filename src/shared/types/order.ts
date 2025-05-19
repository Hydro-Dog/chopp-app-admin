import { ORDER_STATUS, PAYMENT_STATUS } from '@shared/enum';
import { Product } from './product';

type OrderItem = {
  id: string;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
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
