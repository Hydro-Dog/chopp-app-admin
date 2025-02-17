import { ReactNode } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';

type Props = {
  title?: string;
  tooltipText: string;
  space?: number;
  className?: string;
  icon?: ReactNode;
};

export const ChoppTextWithTooltip = ({ title, tooltipText, space = 4, className, icon }: Props) => (
  <Space size={space} className={className}>
    {title}
    <Tooltip title={tooltipText}>{icon || <InfoCircleOutlined />}</Tooltip>
  </Space>
);
