import { Line } from '@ant-design/plots';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
interface DataItem {
  [key: string]: any;
}
interface ChoppLineChartProps {
  data: DataItem[];
  xField: string;
  yField: string;
  point?: {
    shapeField?: string;
    sizeField?: number;
  };
  interaction?: {
    tooltip?: {
      marker?: boolean;
    };
  };
  style?: {
    lineWidth?: number;
  };
}

export const ChoppLineChart = ({
  data,
  xField,
  yField,
  point = { shapeField: 'square', sizeField: 4 },
  interaction = { tooltip: { marker: false } },
  style = { lineWidth: 2 },
}: ChoppLineChartProps) => {
  const { t } = useTranslation();

  console.log('Chart data verification:', {
    sampleItem: data[0],
    xFieldType: typeof data[0]?.[xField],
    yFieldType: typeof data[0]?.[yField],
    yFieldExists: yField in (data[0] || {}),
  });
  console.log('Chart input data:', data);

  console.log('Проверка данных:', {
    firstItem: data[0],
    actualField: yField in (data[0] || {}) ? data[0][yField] : 'Поле отсутствует',
  });

  const config = {
    data,
    xField,
    yField,
    tooltip: {
      showContent: true,
      title: (d: any) => dayjs(d[xField]).format('DD-MM-YYYY'),
      items: [
        // {
        //   name: t(yField),
        //   value: (d) => d[yField],
        // },
        {
          name: t(yField),
          value: (item: DataItem) => {
            const val = item[yField];
            console.log('Tooltip value access:', { item, value: val }); // Дебаг
            return val !== undefined ? val : 'N/A';
          },
        },
      ],
    },
    axis: {
      x: {
        labelFormatter: (value) => dayjs(value).format('DD-MM-YYYY'),
      },
    },
    point,
    interaction,
    style,

    // formatter: (datum: any) => {
    //   return {
    //     name: t(yField),
    //     value: datum[yField],
    //   };
    // },
  };

  return <Line {...config} />;
};
