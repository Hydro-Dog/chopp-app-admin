import { Modal } from 'antd';

export const ConfirmModal = ({open, onOk, onCancel, title, children}) => {
  return (
    <Modal
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}>
      {children}
    </Modal>
  );
};
