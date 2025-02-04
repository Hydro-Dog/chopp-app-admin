import { PropsWithChildren, ReactNode } from 'react';
import { Modal } from 'antd';

type Props = {
  open: boolean;
  title?: ReactNode;
  width?: string | number;
  loading?: boolean;
  // confirmLoading?: boolean;
  onOk: () => void;
  onCancel: () => void;
  zIndex?: number;
};

//TODO: удалить, заменить везде на обычный Modal
export const BasicModal = ({
  children,
  open,
  loading,
  title,
  onOk,
  onCancel,
  // confirmLoading,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Modal title={title} loading={loading} open={open} onOk={onOk} onCancel={onCancel} {...props}>
      {children}
    </Modal>
  );
};
