import { ACTIVITY_STATUS } from '@shared/enum';
import { toScreamingSnakeCase } from './to-screaming-snake-case';

export const statusMenuItems = [
  { key: ACTIVITY_STATUS.PROCESSING, label: ACTIVITY_STATUS.PROCESSING },
  { key: ACTIVITY_STATUS.ACCEPTED, label: ACTIVITY_STATUS.ACCEPTED },
  { key: ACTIVITY_STATUS.ON_THE_WAY, label: ACTIVITY_STATUS.ON_THE_WAY },
  { key: ACTIVITY_STATUS.ON_THE_SPOT, label: ACTIVITY_STATUS.ON_THE_SPOT },
  { key: ACTIVITY_STATUS.COMPLETED, label: ACTIVITY_STATUS.COMPLETED },
  { key: ACTIVITY_STATUS.CANCELED, label: ACTIVITY_STATUS.CANCELED },
];

export const getChangeStatusDropdownItems = (status?: ACTIVITY_STATUS) =>
  statusMenuItems.map((item) => ({
    ...item,
    label: toScreamingSnakeCase(item.key),
    disabled: item.key === status,
  }));
