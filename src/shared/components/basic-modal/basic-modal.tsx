import { PropsWithChildren, ReactNode } from 'react';
import { Modal } from 'antd';

type Props = {
  open: boolean;
  title?: ReactNode;
  width?: string | number;
  loading?: boolean;
  onOk: () => void;
  onCancel: () => void;
  zIndex?: number;
};

export const BasicModal = ({
  children,
  open,
  loading,
  title,
  onOk,
  onCancel,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Modal title={title} loading={loading} open={open} onOk={onOk} onCancel={onCancel} {...props}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
