import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { usePaymentsContext } from '@pages/payments/context';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

export const PaymentsDateFilter = () => {
  const { setStartDate, setEndDate } = usePaymentsContext();
  const { t } = useTranslation();

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
        placeholder={[t('ORDERS_PAGE.START_DATE'), t('ORDERS_PAGE.END_DATE')]}
        className="w-2/6"
        allowEmpty={[true, true]}
        format={'DD.MM.YYYY'}
        onCalendarChange={handleDateChange}
        minDate={dayjs('2000-01-01', 'YYYY-MM-DD')}
        maxDate={dayjs('2100-01-01', 'YYYY-MM-DD')}
      />
    </Space>
  );
};
