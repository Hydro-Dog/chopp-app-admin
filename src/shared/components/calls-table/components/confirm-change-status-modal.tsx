import { ConfirmModal } from '@shared/components/confirm-modal';
import { ChangeStatusType } from '../types';

type Props = {
  data?: ChangeStatusType;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export const ConfirmChangeStatusModal = ({ data, open, onOk, onCancel }: Props) => {
  return (
    <ConfirmModal title="Изменить статус?" open={open} onOk={onOk} onCancel={onCancel}>
      Изменить статус заказа {data?.item.id} с {data?.item.status} на {data?.newStatus}
    </ConfirmModal>
  );
};
