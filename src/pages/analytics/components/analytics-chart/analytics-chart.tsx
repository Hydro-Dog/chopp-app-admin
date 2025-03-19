import { ChoppLineChart } from '@shared/components/chopp-line-chart';
import { useEffect, useState } from 'react';
import { GeneralAnalyticsData } from '@shared/types';

export const AnalyticsChart = () => {
  const [data, setData] = useState<GeneralAnalyticsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          'http://80.78.242.165/api/analytics/orders?endDate=2025-02-17&startDate=2025-02-23&days=7&period=week',
        );
        const data = (await response.json()) as GeneralAnalyticsData[];
        setData(data);
      } catch (e: any) {
        setError(e);
      }

      setLoading(false);
    };

    fetchAnalyticsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(data);
  return <ChoppLineChart data={data}></ChoppLineChart>;
};
