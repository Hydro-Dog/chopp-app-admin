import { ChoppInfoModal, filterObjectByKeys, Order } from '@shared/index';

type Props = {
  order?: Order;
  open: boolean;
  onOk: () => void;
};

export const OrderDetailsModal = ({ open, onOk, order }: Props) => {
  const allowed = {
    id: true,
    name: true,
    orderStatus: true,
    paymentStatus: true,
    phoneNumber: true,
    totalPrice: true,
    transactionId: true,
    address: true,
    comment: true,
    createdAt: true,
    items: {
      '*': {
        price: true,
        quantity: true,
        product: {
          title: true,
          category: {
            title: true,
          },
        },
      },
    },
  };

  const keyTranslations = {
    id: 'ID',
    name: 'NAME',
    orderStatus: 'ORDER_STATUS_TITLE',
    paymentStatus: 'PAYMENT_STATUS_TITLE',
    phoneNumber: 'PHONE_NUMBER',
    totalPrice: 'PRICE',
    transactionId: 'TRANSACTION_ID',
    address: 'ADDRESS',
    comment: 'COMMENT',
    createdAt: 'CREATED_AT',
    product: 'PRODUCT',
    price: 'PRICE',
    quantity: 'QUANTITY',
    title: 'TITLE_NAME',
    category: 'CATEGORY',
    items: 'SHOPPING_CART_ITEMS',
  };

  const filteredKeys = filterObjectByKeys({ input: order, allowed });

  return (
    <ChoppInfoModal
      keyTranslations={keyTranslations}
      open={open}
      onOk={onOk}
      value={filteredKeys}
    />
  );
};
