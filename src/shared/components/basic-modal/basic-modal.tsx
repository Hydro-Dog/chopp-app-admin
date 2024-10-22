import { Button, Modal } from 'antd';
import { PropsWithChildren } from 'react';

type Props = {
  open: boolean;
  title?: ReactNode;
  width?: string | number;
  onOk: () => void;
  onCancel: () => void;
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
    <Modal title={title} loading={loading} open={open} onOk={onOk} onCancel={onCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
