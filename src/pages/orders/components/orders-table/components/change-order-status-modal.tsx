import { BasicModal } from '@shared/components';
import { Order } from '@shared/types';

type Props = {
  order?: Order;
  open: boolean;
  onClose: () => void;
};

export const ChangeOrderStatusModal = ({ order, open, onClose }: Props) => {
  const onSubmit = () => {
    onClose();
  };

  return (
    <BasicModal open={open} onOk={onSubmit} onCancel={onClose}>
      Modal: {JSON.stringify(order)}
    </BasicModal>
  );
};
