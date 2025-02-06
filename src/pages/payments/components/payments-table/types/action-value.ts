import { ACTION_MENU_ITEMS } from '../enums';
import { Payment } from '@shared/types/payment';

export type ActionValue = {
  key: ACTION_MENU_ITEMS;
  record: Payment;
};
