import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePaymentsContext } from '@pages/payments/context';
import { fetchPayments } from '@store/slices';
import { AppDispatch } from '@store/store';
import dayjs from 'dayjs';

export const useUpdateTableOnFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate, status, payment_id, setList } = usePaymentsContext();

  useEffect(() => {
    setList([]);

    const searchRequest: Record<string, string> = {};

    if (startDate) {
      searchRequest['created_at.gte'] = dayjs(startDate, 'DD.MM.YYYY').toISOString();
    }
    if (endDate) {
      searchRequest['created_at.lte'] = dayjs(endDate, 'DD.MM.YYYY').toISOString();
    }
    if (status) {
      searchRequest['status'] = status;
    }
    if (payment_id) {
      searchRequest['payment_id'] = payment_id;
    }

    dispatch(fetchPayments(searchRequest));
  }, [startDate, endDate, status, payment_id, dispatch, setList]);
};
