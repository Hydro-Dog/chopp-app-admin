import { PropsWithChildren, ReactNode } from 'react';
import { Modal } from 'antd';

type Props = {
  open: boolean;
  title?: ReactNode;
  width?: string | number;
  loading?: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  open,
  onOk,
  onCancel,
  title,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Modal
      zIndex={1000}
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      // @ts-ignore
      footer={(_: any, { OkBtn, CancelBtn }: any) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}>
      {children}
    </Modal>
  );
};
