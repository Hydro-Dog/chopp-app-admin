import { useTranslation } from 'react-i18next';
import { ORDER_STATUS, ORDER_STATUS_MAP } from '@shared/index';
import { Tag, Tooltip } from 'antd';

type Props = {
  status: ORDER_STATUS;
};

export const ChoppOrderStatus = ({ status }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t(ORDER_STATUS_MAP[status]?.tooltip)}>
      <Tag className="cursor-pointer" color={ORDER_STATUS_MAP[status]?.color}>
        {t(ORDER_STATUS_MAP[status]?.title)}
      </Tag>
    </Tooltip>
  );
};
