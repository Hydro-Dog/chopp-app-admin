import { ReactNode } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useThemeToken } from '@shared/index';
import { Space, Tooltip, Typography } from 'antd';

const { Paragraph } = Typography;

type Props = {
  title?: string;
  tooltipText?: string;
  space?: number;
  className?: string;
  icon?: ReactNode;
  copyable?: boolean;
  showInfoIcon?: boolean;
};

export const ChoppTextWithTooltip = ({
  title,
  tooltipText,
  space = 4,
  className,
  icon,
  copyable,
  showInfoIcon = true,
}: Props) => {
  const themeToken = useThemeToken();

  return (
    <Space size={space} className={className}>
      {tooltipText && (
        <Tooltip title={tooltipText} className="flex items-center gap-1">
          <Paragraph ellipsis className="!m-0" copyable={copyable}>
            {title}
          </Paragraph>
          {showInfoIcon && <InfoCircleOutlined style={{ color: themeToken.colorPrimary }} />}
        </Tooltip>
      )}
    </Space>
  );
};
