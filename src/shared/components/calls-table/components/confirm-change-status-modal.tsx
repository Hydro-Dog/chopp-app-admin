import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '@shared/components/confirm-modal';
import { toScreamingSnakeCase } from '@shared/utils';
import { ChangeStatusType } from '../types';
import { ACTIVITY_COLORS } from '@shared/enum';
import { Tag } from 'antd';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

type Props = {
  data?: ChangeStatusType;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export const ConfirmChangeStatusModal = ({ data, open, onOk, onCancel }: Props) => {
  const { t } = useTranslation();
  return (
    <ConfirmModal title="Изменить статус?" open={open} onOk={onOk} onCancel={onCancel}>
      <div className="flex flex-col gap-3">
        <div>Изменить статус заказа {data?.item.id}</div>
        <div className="flex flex-col items-center gap-1">
          <Tag 
            color={ACTIVITY_COLORS[data?.item.status]}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 16 }}>
            {t(`ACTIVITY_STATUS.${toScreamingSnakeCase(data?.item.status || '')}`)}
          </Tag>
          <KeyboardDoubleArrowDownIcon color="action" fontSize="small" />
          <Tag
            color={ACTIVITY_COLORS[data?.newStatus]}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 16 }}>
            {t(`ACTIVITY_STATUS.${toScreamingSnakeCase(data?.newStatus || '')}`)}
          </Tag>
        </div>
      </div>
    </ConfirmModal>
  );
};
