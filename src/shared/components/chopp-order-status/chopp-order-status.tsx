import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ORDER_STATUS, ORDER_STATUS_MAP } from '@shared/index';
import { Tag, Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

type Props = {
  status: ORDER_STATUS;
  className?: string;
  tooltipPlacement?: TooltipPlacement;
  icon?: ReactNode;
  onClick?: (value?: any) => void;
};

export const ChoppOrderStatus = ({ icon, status, className, tooltipPlacement, onClick }: Props) => {
  console.log('status: ', status);
  const { t } = useTranslation();

  return (
    <Tooltip placement={tooltipPlacement} title={t(ORDER_STATUS_MAP[status]?.tooltip)}>
      {/* TODO: заменить на ChoppTag */}
      <Tag
        className={`border-none cursor-pointer ${className}`}
        color={ORDER_STATUS_MAP[status]?.color}
        onClick={onClick}>
        {icon} {t(ORDER_STATUS_MAP[status]?.title)}
      </Tag>
    </Tooltip>
  );
};
