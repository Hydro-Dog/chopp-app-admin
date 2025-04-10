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

export const AnalyticsChart = () => {
  const { t } = useTranslation();
  const { analyticsData, fetchAnalyticsDataStatus } = useSelector(
    (state: RootState) => state.analytics,
  );
  const { showErrorNotification } = useNotificationContext();

  const { superDispatch } = useSuperDispatch<GeneralAnalyticsData, FetchAnalyticsOrdersParams>();

  useEffect(() => {
    superDispatch({
      action: fetchAnalyticsData({ endDate: '2025-04-10', startDate: '2025-03-22' }),
      catchHandler: (error) =>
        showErrorNotification({ message: t('ERROR'), description: error.message }),
    });
  }, []);

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
