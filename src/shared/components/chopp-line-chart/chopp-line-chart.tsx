import { Line } from '@ant-design/plots';

export const ChoppLineChart = ({ data, xField, yField }) => {
  const config = {
    data,
    xField,
    yField,
    point: {
      shapeField: 'square',
      sizeField: 4,
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
