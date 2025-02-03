// Enum для статусов платежа
export enum PAYMENT_STATUS {
  WAITING_FOR_CAPTURE = 'waiting_for_capture',
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  CANCELED = 'canceled',
}

// Тип суммы платежа
export type PaymentAmount = {
  value: string;
  currency: string;
};

// Тип для данных авторизации платежа
export type AuthorizationDetails = {
  rrn: string;
  auth_code: string;
  three_d_secure: {
    applied: boolean;
  };
};

// Тип для метода платежа (в данном случае - банковская карта)
export type PaymentMethod = {
  type: 'bank_card';
  id: string;
  saved: boolean;
  card: {
    first6: string;
    last4: string;
    expiry_month: string;
    expiry_year: string;
    card_type: string;
    card_product?: {
      code: string;
      name: string;
    };
    issuer_country?: string;
    issuer_name?: string;
  };
  title: string;
};

// Тип для получателя платежа
export type PaymentRecipient = {
  account_id: string;
  gateway_id: string;
};

// Основной тип платежа
export type Payment = {
  id: string;
  status: PAYMENT_STATUS;
  paid: boolean;
  amount: PaymentAmount;
  authorization_details?: AuthorizationDetails;
  created_at: string;
  description?: string;
  expires_at?: string;
  metadata?: Record<string, any>;
  payment_method: PaymentMethod;
  recipient: PaymentRecipient;
  refundable: boolean;
  test: boolean;
  income_amount?: PaymentAmount;
};
