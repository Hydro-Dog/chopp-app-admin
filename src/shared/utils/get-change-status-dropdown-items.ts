import { CALL_STATUS } from '@shared/enum';

export const statusMenuItems = [
  { key: CALL_STATUS.PROCESSING, label: CALL_STATUS.PROCESSING },
  { key: CALL_STATUS.ACCEPTED, label: CALL_STATUS.ACCEPTED },
  { key: CALL_STATUS.ON_THE_WAY, label: CALL_STATUS.ON_THE_WAY },
  { key: CALL_STATUS.ON_THE_SPOT, label: CALL_STATUS.ON_THE_SPOT },
  { key: CALL_STATUS.COMPLETED, label: CALL_STATUS.COMPLETED },
  { key: CALL_STATUS.CANCELED, label: CALL_STATUS.CANCELED },
];

export const getChangeStatusDropdownItems = (status?: CALL_STATUS) =>
  statusMenuItems.map((item) => (item.key === status ? { ...item, disabled: true } : item));
