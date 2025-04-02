import { useTranslation } from 'react-i18next';
import { PAYMENT_STATUS, PAYMENT_STATUS_MAP } from '@shared/index';
import { Tag, Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

type Props = {
  status: PAYMENT_STATUS;
  tooltipPlacement?: TooltipPlacement;
};

export const ChoppPaymentStatus = ({ status, tooltipPlacement }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip placement={tooltipPlacement} title={t(PAYMENT_STATUS_MAP[status]?.tooltip)}>
      <Tag className="border-none cursor-pointer" color={PAYMENT_STATUS_MAP[status]?.color}>
        {t(PAYMENT_STATUS_MAP[status]?.title)}
      </Tag>
    </Tooltip>
  );
};
