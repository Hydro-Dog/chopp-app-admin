import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchPayments } from '@store/slices';
import { AppDispatch } from '@store/store';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

export const PaymentsDateFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const handleDateChange = useCallback(
    (dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string]) => {
      const updatedParams = new URLSearchParams(searchParams);

      if (dates[0]) {
        updatedParams.set('startDate', dates[0].format('DD.MM.YYYY'));
      } else {
        updatedParams.delete('startDate');
      }

      if (dates[1]) {
        updatedParams.set('endDate', dates[1].format('DD.MM.YYYY'));
      } else {
        updatedParams.delete('endDate');
      }
      const fetchWithSearchParams = (params: URLSearchParams) => {
        const searchRequest: Record<string, string> = {};
        if (params.get('startDate')) {
          searchRequest['created_at.gte'] = dayjs(params.get('startDate'), 'DD.MM.YYYY').toISOString();
        }
        if (params.get('endDate')) {
          searchRequest['created_at.lte'] = dayjs(params.get('endDate'), 'DD.MM.YYYY').toISOString();
        }
        dispatch(fetchPayments(searchRequest));
      };
      setSearchParams(updatedParams);
      fetchWithSearchParams(updatedParams);
    },
    [searchParams, setSearchParams, dispatch],
  );

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        allowEmpty={[true, true]}
        format={'DD.MM.YYYY'}
        onCalendarChange={handleDateChange}
        defaultValue={[startDate ? dayjs(startDate, 'DD.MM.YYYY') : null, endDate ? dayjs(endDate, 'DD.MM.YYYY') : null]}
      />
    </Space>
  );
};
