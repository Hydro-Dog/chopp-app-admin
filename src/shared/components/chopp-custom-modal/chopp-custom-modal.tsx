import { PropsWithChildren, ReactNode } from 'react';
import { Button, Modal } from 'antd';
import { ButtonColorType, ButtonVariantType } from 'antd/es/button';

type Props = {
  open: boolean;
  title?: ReactNode;
  width?: string | number;
  confirmLoading?: boolean;
  okTitle?: string;
  okDisabled?: boolean;
  okType?: 'primary' | 'link' | 'text' | 'default' | 'dashed';
  okColor?: ButtonColorType;
  okVariant?: ButtonVariantType;
  onOk: () => void;
  onCancel: () => void;
};

//TODO: Удалить, заменить на custom modal который будет принимать кастомные кнопки
export const CustomModal = ({
  open,
  onOk,
  okTitle,
  okColor,
  okDisabled,
  okType = 'primary',
  okVariant = 'solid',
  onCancel,
  title,
  children,
  confirmLoading,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Modal
      zIndex={1000}
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      // @ts-ignore
      footer={(_: any, { OkBtn, CancelBtn }: any) => (
        <>
          <CancelBtn />
          {okTitle ? (
            <Button
              disabled={okDisabled || confirmLoading}
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
