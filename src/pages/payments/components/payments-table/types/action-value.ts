import { Payment } from '@shared/types/payment';
import { ACTION_MENU_ITEMS } from '../enums';

export type ActionValue = {
  key: ACTION_MENU_ITEMS;
  record: Payment;
};
