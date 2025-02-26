import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropsWithChildrenOnly } from '@shared/types';

type PaymentsContextType = {
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;
  endDate: string;
  startDate: string;
  status: string;
};

const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);

export const PaymentsProvider = ({ children }: PropsWithChildrenOnly) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStartDate = searchParams.get('startDate') || '';
  const initialEndDate = searchParams.get('endDate') || '';
  const initialStatus = searchParams.get('status') || '';
  const [startDate, setStartDate] = useState<string>(initialStartDate);
  const [endDate, setEndDate] = useState<string>(initialEndDate);
  const [status, setStatus] = useState<string>(initialStatus);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('startDate', startDate);
    params.set('endDate', endDate);
    params.set('status', status);
    setSearchParams(params);
  }, [startDate, endDate, status, setSearchParams]);

  return (
    <PaymentsContext.Provider
      value={{
        setStartDate,
        setEndDate,
        setStatus,
        endDate,
        startDate,
        status,
      }}>
      {children}
    </PaymentsContext.Provider>
  );
};
export const usePaymentsContext = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error('usePaymentsContext must be used within a PaymentsProvider');
  }
  return context;
};
