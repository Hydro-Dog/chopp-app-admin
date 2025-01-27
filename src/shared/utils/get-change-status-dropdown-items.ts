import { ORDER_STATUS } from '@shared/enum';
import { toScreamingSnakeCase } from './to-screaming-snake-case';

export const statusMenuItems = [
  { key: ORDER_STATUS.PROCESSING, label: ORDER_STATUS.PROCESSING },
  { key: ORDER_STATUS.ACCEPTED, label: ORDER_STATUS.ACCEPTED },
  { key: ORDER_STATUS.ON_THE_WAY, label: ORDER_STATUS.ON_THE_WAY },
  { key: ORDER_STATUS.ON_THE_SPOT, label: ORDER_STATUS.ON_THE_SPOT },
  { key: ORDER_STATUS.COMPLETED, label: ORDER_STATUS.COMPLETED },
  { key: ORDER_STATUS.CANCELED, label: ORDER_STATUS.CANCELED },
];

export const getChangeStatusDropdownItems = (status?: ORDER_STATUS) =>
  statusMenuItems.map((item) => ({
    ...item,
    label: toScreamingSnakeCase(item.key),
    disabled: item.key === status,
  }));
