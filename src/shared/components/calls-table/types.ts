import { ACTIVITY_STATUS } from '@shared/enum';
import { CallsTableRecord } from '@store/slices';

export type ChangeStatusType = {
  item: CallsTableRecord;
  newStatus: ACTIVITY_STATUS;
};
