import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnalyticsContext } from '@pages/analytics/context';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const displayFormat = 'DD-MM-YYYY';
const dateFormat = 'YYYY-MM-DD';

export const AnalyticsDateFilter = () => {
  const { t } = useTranslation();
  const { setStartDate, setEndDate, startDate, endDate } = useAnalyticsContext();

  const handleDateChange = useCallback(
    (dates: [Dayjs | null, Dayjs | null]) => {
      const [start, end] = dates;
      if (start && end && start.isAfter(end)) {
        setStartDate(end.format(dateFormat));
        setEndDate(start.format(dateFormat));
        return;
      }
      setStartDate(start ? start.format(dateFormat) : '');
      setEndDate(end ? end.format(dateFormat) : '');
    },
    [setStartDate, setEndDate],
  );

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        value={[
          startDate ? dayjs(startDate, dateFormat) : null,
          endDate ? dayjs(endDate, dateFormat) : null,
        ]}
        placeholder={[t('START_DATE'), t('END_DATE')]}
        className="w-full md:w-2/6"
        allowEmpty={[true, true]}
        format={displayFormat}
        onCalendarChange={handleDateChange}
        minDate={dayjs('2000-01-01', dateFormat)}
        maxDate={dayjs('2100-01-01', dateFormat)}
      />
    </Space>
  );
};
