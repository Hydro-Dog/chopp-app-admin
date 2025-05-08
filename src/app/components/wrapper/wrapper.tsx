import { PropsWithChildrenOnly } from '@shared/types';
import { useNewOrderNotification } from 'src/app/hooks';

export const Wrapper = ({ children }: PropsWithChildrenOnly) => {
  useNewOrderNotification();

  return children;
};
