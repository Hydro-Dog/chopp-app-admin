import { ChoppLineChart } from '@shared/components/chopp-line-chart';
import { GeneralAnalyticsData, FETCH_STATUS } from '@shared/types';
import { useEffect } from 'react';
import { fetchAnalyticsData, FetchAnalyticsOrdersParams } from '@store/slices';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useNotificationContext } from '@shared/context';
import { useSuperDispatch } from '@shared/hooks';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useAnalyticsContext } from '@pages/analytics/context';

export const AnalyticsChart = () => {
  const { startDate, endDate } = useAnalyticsContext();
  const { t } = useTranslation();
  const { analyticsData, fetchAnalyticsDataStatus } = useSelector(
    (state: RootState) => state.analytics,
  );
  const { showErrorNotification } = useNotificationContext();

  const { superDispatch } = useSuperDispatch<GeneralAnalyticsData, FetchAnalyticsOrdersParams>();

  const getDefaultStartDate = () => {
    return dayjs().subtract(1, 'month').format('YYYY-MM-DD');
  };
  const getDefaultEndDate = () => {
    return dayjs().format('YYYY-MM-DD');
  };

  const params: FetchAnalyticsOrdersParams = {
    startDate: startDate || getDefaultStartDate(),
    endDate: endDate || getDefaultEndDate(),
  };

  useEffect(() => {
    superDispatch({
      action: fetchAnalyticsData(params),
      catchHandler: (error) =>
        showErrorNotification({ message: t('ERROR'), description: error.message }),
    });
  }, [startDate, endDate]);

  if (fetchAnalyticsDataStatus === FETCH_STATUS.LOADING) {
    return <Spin size="small" />;
  }

  if (!analyticsData?.items?.length) {
    return <div>{t('Данные не найдены')}</div>;
  }

  return (
    <>
      <ChoppLineChart
        data={analyticsData.items}
        xField="date"
        yField="ordersQuantity"></ChoppLineChart>
    </>
  );
};
