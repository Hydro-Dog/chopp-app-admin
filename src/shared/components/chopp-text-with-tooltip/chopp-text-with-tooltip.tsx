import { ReactNode } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useThemeToken } from '@shared/index';
import { Space, Tooltip, Typography } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

const { Paragraph } = Typography;

type Props = {
  title?: ReactNode;
  tooltipText?: string;
  space?: number;
  className?: string;
  icon?: ReactNode;
  copyable?: boolean;
  showInfoIcon?: boolean;
  placement?: TooltipPlacement;
};

export const ChoppTextWithTooltip = ({
  title,
  tooltipText,
  space = 4,
  className,
  icon,
  copyable,
  showInfoIcon = true,
  placement,
}: Props) => {
  const themeToken = useThemeToken();

  return (
    <Space size={space} className={className}>
      <Tooltip placement={placement} title={tooltipText} className="flex items-center gap-1">
        <Paragraph ellipsis className="!m-0" copyable={copyable}>
          {title}
        </Paragraph>
        {showInfoIcon && <InfoCircleOutlined style={{ color: themeToken.colorPrimary }} />}
      </Tooltip>
    </Space>
  );
};
