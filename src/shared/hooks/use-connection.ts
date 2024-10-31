import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

export const useConnection = (cb: () => void, deps: any[]) => {
  const { wsConnected } = useSelector((state: RootState) => state.ws);

  useEffect(() => {
    if (wsConnected) {
      cb();
    }
  }, [wsConnected, ...deps]);
};
