import { PropsWithChildren, ReactNode } from 'react';
import { Button, Modal } from 'antd';
import { ButtonColorType, ButtonVariantType } from 'antd/es/button';

type Props = {
  open: boolean;
  title?: ReactNode;
  width?: string | number;
  confirmLoading?: boolean;
  okTitle?: string;
  okType?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  okColor?: ButtonColorType;
  okVariant?: ButtonVariantType;
  onOk: () => void;
  onClose?: () => void;
};

export const ChoppOkModal = ({
  open,
  onOk,
  onClose,
  okTitle,
  okColor,
  okType = 'primary',
  okVariant = 'solid',
  title,
  children,
  confirmLoading,
  ...props
}: PropsWithChildren<Props>) => {
  console.log('onClose: ', onClose)
  console.log('onOk: ', onOk)
  return (
    <Modal
      zIndex={1000}
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onClose || onOk}
      onClose={onClose || onOk}
      confirmLoading={confirmLoading}
      // @ts-ignore
      footer={(_: any, { OkBtn, CancelBtn }: any) => (
        <>
          {okTitle ? (
            <Button
              // disabled={confirmLoading}
              loading={confirmLoading}
              color={okColor}
              type={okType}
              variant={okVariant}
              onClick={onOk}>
              {okTitle}
            </Button>
          ) : (
            <OkBtn />
          )}
        </>
      )}
      {...props}>
      {children}
    </Modal>
  );
};
