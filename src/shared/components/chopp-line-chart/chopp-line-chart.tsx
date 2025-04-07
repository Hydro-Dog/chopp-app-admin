import { Line } from '@ant-design/plots';

interface ChoppLineChartProps {
  data: any;
  xField: string;
  yField: string;
  point?: {
    shapeField: string;
    sizeField: number;
  };
  interaction?: {
    tooltip: {
      marker: boolean;
    };
  };
  style?: {
    lineWidth: number;
  };
}

export const ChoppLineChart = ({ data, xField, yField }: ChoppLineChartProps) => {
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
