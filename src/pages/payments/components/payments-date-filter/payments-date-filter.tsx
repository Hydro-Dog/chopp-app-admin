import { useCallback } from 'react';
import { usePaymentsContext } from '@pages/payments/context';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

export const PaymentsDateFilter = () => {
  const { startDate, endDate, setStartDate, setEndDate } = usePaymentsContext();

  const handleDateChange = useCallback(
    (dates: [Dayjs | null, Dayjs | null], dateStrings: [string, string]) => {
      if (dates[0]) {
        setStartDate(dates[0].format('DD.MM.YYYY'));
      } else {
        setStartDate('');
      }

      if (dates[1]) {
        setEndDate(dates[1].format('DD.MM.YYYY'));
      } else {
        setEndDate('');
      }
    },
    [setStartDate, setEndDate],
  );

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        allowEmpty={[true, true]}
        format={'DD.MM.YYYY'}
        onCalendarChange={handleDateChange}
        defaultValue={[
          startDate ? dayjs(startDate, 'DD.MM.YYYY') : null,
          endDate ? dayjs(endDate, 'DD.MM.YYYY') : null,
        ]}
      />
    </Space>
  );
};
