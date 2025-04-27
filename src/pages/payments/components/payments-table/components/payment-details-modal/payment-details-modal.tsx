import { ChoppInfoModal, filterObjectByKeys, Payment } from '@shared/index';

type Props = {
  payment?: Payment;
  open: boolean;
  onOk: () => void;
};

export const PaymentDetailsModal = ({ open, onOk, payment }: Props) => {
  console.log('payment: ', payment);
  const allowed = {
    id: true,
    amount: {
      currency: true,
      value: true,
    },
    authorization_details: {
      auth_code: true,
      rrn: true,
      three_d_secure: {
        applied: true,
        challenge_completed: true,
        method_completed: true,
      },
    },

    captured_at: true,
    created_at: true,
    description: true,
    income_amount: {
      currency: true,
      value: true,
    },
    metadata: {
      order_id: true,
    },
    paid: true,
    payment_method: {
      id: true,
      type: true,
      card: {
        card_type: true,
        expiry_month: true,
        expiry_year: true,
        first6: true,
        last4: true,
      },
      saved: true,
      status: true,
      title: true,
      wallet: {
        type: true,
        provider: true,
      },
    },
    receipt_registration: true,
    recipient: {
      account_id: true,
      gateway_id: true,
    },
    refundable: true,
    refunded_amount: {
      currency: true,
      value: true,
    },
    status: true,
    test: true,
  };

  const keyTranslations = {
    id: 'ID',

    amount: 'AMOUNT',
    currency: 'CURRENCY',
    value: 'AMOUNT_VALUE',

    authorization_details: 'AUTH_DETAILS',
    auth_code: 'AUTH_CODE',
    rrn: 'RRN',
    three_d_secure: '3D_SECURE',
    applied: '3DS_APPLIED',
    challenge_completed: '3DS_CHALLENGE_COMPLETED',
    method_completed: '3DS_METHOD_COMPLETED',

    captured_at: 'CAPTURED_AT',
    created_at: 'CREATED_AT',
    description: 'DESCRIPTION',

    income_amount: 'INCOME_AMOUNT',
    income_currency: 'INCOME_CURRENCY',
    income_value: 'INCOME_VALUE',

    metadata: 'METADATA',
    order_id: 'ORDER_ID',

    paid: 'PAID',
    status: 'STATUS',
    test: 'TEST_PAYMENT',
    saved: 'SAVED',
    title: 'TITLE',
    type: 'TYPE',

    payment_method: 'PAYMENT_METHOD',
    payment_method_id: 'PAYMENT_METHOD_ID',
    payment_method_type: 'PAYMENT_METHOD_TYPE',
    payment_method_saved: 'PAYMENT_METHOD_SAVED',
    payment_method_status: 'PAYMENT_METHOD_STATUS',
    payment_method_title: 'PAYMENT_METHOD_TITLE',

    card: 'CARD',
    card_type: 'CARD_TYPE',
    expiry_month: 'EXPIRY_MONTH',
    expiry_year: 'EXPIRY_YEAR',
    first6: 'CARD_FIRST6',
    last4: 'CARD_LAST4',

    wallet: 'WALLET',
    wallet_type: 'WALLET_TYPE',
    wallet_provider: 'WALLET_PROVIDER',

    receipt_registration: 'RECEIPT_REGISTRATION',

    recipient: 'RECIPIENT',
    account_id: 'RECIPIENT_ACCOUNT_ID',
    gateway_id: 'RECIPIENT_GATEWAY_ID',

    refundable: 'REFUNDABLE',

    refunded_amount: 'REFUNDED_AMOUNT',
    refunded_currency: 'REFUNDED_CURRENCY',
    refunded_value: 'REFUNDED_VALUE',
  };

  const filteredKeys = filterObjectByKeys({ input: payment, allowed });

  return (
    <ChoppInfoModal
      keyTranslations={keyTranslations}
      open={open}
      onOk={onOk}
      value={filteredKeys}
    />
  );
};
