import { ChoppLineChart } from '@shared/components/chopp-line-chart';
import { GeneralAnalyticsData, ProductAnalyticsData } from '@shared/types'; // планировалось их использование при наличии и отсутствии productId
import { useEffect, useState } from 'react';

const REQUEST_URL =
  'http://localhost:6001/api/analytics/orders?endDate=2025-04-07&startDate=2025-03-22';

export const AnalyticsChart = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const response = await fetch(`${REQUEST_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWQiOjEsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoi0KDQvtC70Ywg0LDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YDQsCIsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMDJUMTg6NTU6NDUuNDIwWiIsInVwZGF0ZWRBdCI6IjIwMjUtMDQtMDJUMTg6NTU6NDUuNDIwWiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjF9fV0sImlhdCI6MTc0Mzc2NzQ4NywiZXhwIjo2MTc0Mzc2NzQ4N30.ihKGpg0yxchAZdht8zwZT5iX6y2WSZMmcRKHtNZ7W_I',
        },
      });
      const data = await response.json();

      setData(data);
    };
    fetchAnalyticsData();
  }, []);
  if (!data) return <div>Loading...</div>; // или <Spin /> из Ant Design
  if (!data.items) return <div>No data</div>;
  const transData = data['items'];
  return (
    <ChoppLineChart data={transData} xField={'date'} yField={'ordersQuantity'}></ChoppLineChart>
  );
};

// const transformedData = data.map((item) => ({
//   orderDate: item.orderDate,
//   quantity: item.product.quantity,
// }));
