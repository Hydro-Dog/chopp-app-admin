import { ORDER_STATUS } from '@shared/enum';
import { useThemeToken } from '../hooks/use-theme-token';

export const ORDER_COLORS = {
  [ORDER_STATUS.IDLE]: 'blue',
  [ORDER_STATUS.PROCESSING]: 'cyan',
  [ORDER_STATUS.ACCEPTED]: 'green',
  [ORDER_STATUS.DECLINED]: 'orange',
  [ORDER_STATUS.ON_THE_WAY]: 'blue',
  [ORDER_STATUS.ON_THE_SPOT]: 'geekblue',
  // [ORDER_STATUS.COMPLETED]: 'lime',
  [ORDER_STATUS.CANCELED]: 'red',
};
