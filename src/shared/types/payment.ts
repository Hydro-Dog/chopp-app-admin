// Основной тип Payment
export interface Payment {
  id: string;
  status: string;
  paid: boolean;
  amount: Amount;
  created_at: string;
  description: string;
  expires_at: string;
  metadata: Record<string, any>;
  payment_method: PaymentMethod;
  recipient: Recipient;
  refundable: boolean;
  test: boolean;
}

// Тип для суммы
export interface Amount {
  value: string;
  currency: string;
}

// Тип для метода оплаты
export interface PaymentMethod {
  type: string;
  id: string;
  saved: boolean;
  card: CardDetails;
  title: string;
}

// Тип для деталей карты
export interface CardDetails {
  first6: string;
  last4: string;
  expiry_month: string;
  expiry_year: string;
  card_type: string;
  card_product: CardProduct;
  issuer_country: string;
  issuer_name: string;
}

// Тип для продукта карты
export interface CardProduct {
  code: string;
  name: string;
}

// Тип для получателя
export interface Recipient {
  account_id: string;
  gateway_id: string;
}

// Тип для ответа с пагинацией
export interface PaymentsResponse {
  type: string; // Обычно "list"
  items: Payment[];
  next_cursor?: string; // Курсор для пагинации, если есть
}
