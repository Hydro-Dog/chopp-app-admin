import { ACTIVITY_STATUS } from '@shared/enum';
import { useThemeToken } from '../hooks/use-theme-token';

export const ACTIVITY_COLORS = {
  [ACTIVITY_STATUS.IDLE]: 'blue',
  [ACTIVITY_STATUS.PROCESSING]: 'cyan',
  [ACTIVITY_STATUS.ACCEPTED]: 'green',
  [ACTIVITY_STATUS.DECLINED]: 'orange',
  [ACTIVITY_STATUS.ON_THE_WAY]: 'blue',
  [ACTIVITY_STATUS.ON_THE_SPOT]: 'geekblue',
  // [ACTIVITY_STATUS.COMPLETED]: 'lime',
  [ACTIVITY_STATUS.CANCELED]: 'red',
};
