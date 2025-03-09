import { useCallback } from 'react';
import { usePaymentsContext } from '@pages/payments/context';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

export const PaymentsDateFilter = () => {
  const { startDate, endDate, setStartDate, setEndDate } = usePaymentsContext();

  const handleDateChange = useCallback(
    (dates: [Dayjs | null, Dayjs | null]) => {
      const [start, end] = dates;
      setStartDate(start ? start.format('DD.MM.YYYY') : '');
      setEndDate(end ? end.format('DD.MM.YYYY') : '');
    },
    [setStartDate, setEndDate],
  );

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        className="w-2/6"
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
