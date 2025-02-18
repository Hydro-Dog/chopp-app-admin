import { Order } from '@shared/types';
import { ACTION_MENU_ITEMS } from '../enums';

export type ActionValue = {
  key: ACTION_MENU_ITEMS;
  record: Order;
};
