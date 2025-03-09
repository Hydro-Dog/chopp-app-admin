import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PropsWithChildrenOnly, Payment } from '@shared/types';

type PaymentsContextType = {
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setPayment_id: Dispatch<SetStateAction<string>>;
  setList: Dispatch<SetStateAction<Payment[]>>;
  endDate: string;
  startDate: string;
  status: string;
  payment_id: string;
  list: Payment[];
};

const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);

export const PaymentsProvider = ({ children }: PropsWithChildrenOnly) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStartDate = searchParams.get('startDate') || '';
  const initialEndDate = searchParams.get('endDate') || '';
  const initialStatus = searchParams.get('status') || '';
  const initialSearch = searchParams.get('payment_id') || '';
  const [startDate, setStartDate] = useState<string>(initialStartDate);
  const [endDate, setEndDate] = useState<string>(initialEndDate);
  const [status, setStatus] = useState<string>(initialStatus);
  const [payment_id, setPayment_id] = useState<string>(initialSearch);
  const [list, setList] = useState<Payment[]>([]);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('startDate', startDate);
    params.set('endDate', endDate);
    params.set('status', status);
    params.set('payment_id', payment_id);
    setSearchParams(params);
  }, [startDate, endDate, status, payment_id, setSearchParams, searchParams]);

  return (
    <PaymentsContext.Provider
      value={{
        setStartDate,
        setEndDate,
        setStatus,
        setPayment_id,
        setList,
        endDate,
        startDate,
        status,
        payment_id,
        list,
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
