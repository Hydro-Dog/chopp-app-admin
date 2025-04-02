import { ChoppLineChart } from '@shared/components/chopp-line-chart';
import { GeneralAnalyticsData, ProductAnalyticsData } from '@shared/types'; // планировалось их использование при наличии и отсутствии productId
import { useEffect, useState } from 'react';

const REQUEST_URL =
  'http://localhost:6001/api/analytics/orders?endDate=2025-03-01&startDate=2025-02-17';

export const AnalyticsChart = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const response = await fetch(`${REQUEST_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoi0KDQvtC70Ywg0LDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YDQsCIsImNyZWF0ZWRBdCI6IjIwMjUtMDMtMTlUMTQ6NTA6NDIuMjQwWiIsInVwZGF0ZWRBdCI6IjIwMjUtMDMtMTlUMTQ6NTA6NDIuMjQwWiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjF9fV0sImlhdCI6MTc0MzQ0NTU0NiwiZXhwIjoxNzQzNDQ2MTQ2fQ.41szNzfuP089PitVZG2NJMHF64wpvZAujTra9C8klpk',
        },
      });
      const data = await response.json();
      setData(data);
    };
    fetchAnalyticsData();
  }, []);

  return <ChoppLineChart data={data} xField={'date'} yField={'ordersQuantity'}></ChoppLineChart>;
};

// const transformedData = data.map((item) => ({
//   orderDate: item.orderDate,
//   quantity: item.product.quantity,
// }));
