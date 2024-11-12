import { useTranslation } from 'react-i18next';
import { ConfirmModal } from '@shared/components/confirm-modal';
import { toScreamingSnakeCase } from '@shared/utils';
import { ChangeStatusType } from '../types';

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
      Изменить статус заказа {data?.item.id} с "
      {t(`ACTIVITY_STATUS.${toScreamingSnakeCase(data?.item.status || '')}`)}" на "
      {t(`ACTIVITY_STATUS.${toScreamingSnakeCase(data?.newStatus || '')}`)}"
    </ConfirmModal>
  );
};
