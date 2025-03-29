import { ChoppLineChart } from '@shared/components/chopp-line-chart';

// import { GeneralAnalyticsData, ProductAnalyticsData } from '@shared/types'; // планировалось их использование при наличии и отсутствии productId

const data = [
  {
    orderDate: '2025-02-21',
    product: {
      price: {
        value: '100.00',
        currency: 'RUB',
      },
      title: 'Product 1',
      quantity: 2,
    },
  },

  {
    orderDate: '2025-02-25',
    product: {
      price: {
        value: '200.00',
        currency: 'RUB',
      },
      title: 'Product 1',
      quantity: 4,
    },
  },
  {
    orderDate: '2025-02-26',
    product: {
      price: {
        value: '100.00',
        currency: 'RUB',
      },
      title: 'Product 1',
      quantity: 2,
    },
  },
  {
    orderDate: '2025-02-27',
    product: {
      price: {
        value: '100.00',
        currency: 'RUB',
      },
      title: 'Product 1',
      quantity: 2,
    },
  },
  {
    orderDate: '2025-02-28',
    product: {
      price: {
        value: '00.00',
        currency: 'RUB',
      },
      title: 'Product 1',
      quantity: 0,
    },
  },
];
const transformedData = data.map((item) => ({
  orderDate: item.orderDate,
  quantity: item.product.quantity,
}));
export const AnalyticsChart = () => {
  return (
    <ChoppLineChart
      data={transformedData}
      xField={'orderDate'}
      yField={'quantity'}></ChoppLineChart>
  );
};
// const data = {
//   items: [
//     {
//       date: '2025-02-17',
//       ordersQuantity: 5,
//       amount: {
//         value: '1500.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-18',
//       ordersQuantity: 4,
//       amount: {
//         value: '1200.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-19',
//       ordersQuantity: 5,
//       amount: {
//         value: '1500.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-20',
//       ordersQuantity: 0,
//       amount: {
//         value: '00.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-21',
//       ordersQuantity: 3,
//       amount: {
//         value: '1000.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-22',
//       ordersQuantity: 10,
//       amount: {
//         value: '3000.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-23',
//       ordersQuantity: 8,
//       amount: {
//         value: '2000.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-24',
//       ordersQuantity: 8,
//       amount: {
//         value: '2000.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-25',
//       ordersQuantity: 7,
//       amount: {
//         value: '1800.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-26',
//       ordersQuantity: 14,
//       amount: {
//         value: '5000.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-27',
//       ordersQuantity: 8,
//       amount: {
//         value: '2000.00',
//         currency: 'RUB',
//       },
//     },
//     {
//       date: '2025-02-28',
//       ordersQuantity: 3,
//       amount: {
//         value: '1000.00',
//         currency: 'RUB',
//       },
//     },
//   ],
//   summary: {
//     totalAmount: {
//       value: '1500.00',
//       currency: 'RUB',
//     },
//     minOrderAmount: '200.00',
//     maxOrderAmount: '500.00',
//     averageOrderAmount: '300.00',
//   },
// };
