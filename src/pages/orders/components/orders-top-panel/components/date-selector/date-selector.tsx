import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '@pages/orders/context';
import { useRefetchTableOrders } from '@pages/orders/hooks';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

export const DateSelector = () => {
  const { setStartDate, startDate, setEndDate, endDate } = useOrdersContext();
  const filters = useRefetchTableOrders();

  const { t } = useTranslation();

  const changeDate: RangePickerProps['onChange'] = (dates, dateStrings) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
    filters({ startDateParam: dateStrings[0], endDateParam: dateStrings[1] });
  };

  return (
    <DatePicker.RangePicker
      placeholder={[t('ORDERS_PAGE.START_DATE'), t('ORDERS_PAGE.END_DATE')]}
      allowEmpty={[false, true]}
      onChange={changeDate}
      value={[startDate ? dayjs(startDate) : null, endDate ? dayjs(endDate) : null]}
      minDate={dayjs('2000-01-01', 'YYYY-MM-DD')}
      maxDate={dayjs('2100-01-01', 'YYYY-MM-DD')}
    />
  );
};
