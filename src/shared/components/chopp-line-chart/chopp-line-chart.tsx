import { Line } from '@ant-design/plots';

export const ChoppLineChart = ({ data }) => {
  const config = {
    data,
    xField: 'date',
    yField: 'ordersQuantity',
    point: {
      shapeField: 'square',
      sizeField: 2,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};
