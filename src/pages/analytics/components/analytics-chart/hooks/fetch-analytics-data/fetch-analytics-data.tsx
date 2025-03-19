import { GeneralAnalyticsData } from '@shared/types';

export const fetchAnalyticsData = async () => {
  const response = await fetch('/analytics/orders');

  const data = (await response.json()) as GeneralAnalyticsData[];
  return data;
};
