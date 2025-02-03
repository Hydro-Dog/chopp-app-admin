import { InfoCircleOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';

type Props = { title: string; tooltipText: string; space?: number };

export const ChoppInfoText = ({ title, tooltipText, space = 4 }: Props) => (
  <Space size={space}>
    {title}
    <Tooltip title={tooltipText}>
      <InfoCircleOutlined />
    </Tooltip>
  </Space>
);
