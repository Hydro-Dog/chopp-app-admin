export const ORDER_STATUS_MAP = {
  // 💳 Платёж
  awaitingPayment: {
    color: 'default', // ожидание
    title: 'ORDER_STATUS.AWAITING_PAYMENT',
    tooltip: 'ORDER_STATUS.AWAITING_PAYMENT_TOOLTIP',
  },
  paymentSucceeded: {
    color: 'default', // успешно
    title: 'ORDER_STATUS.PAYMENT_SUCCEEDED',
    tooltip: 'ORDER_STATUS.PAYMENT_SUCCEEDED_TOOLTIP',
  },
  paymentCanceled: {
    color: 'default', // отказ
    title: 'ORDER_STATUS.PAYMENT_CANCELED',
    tooltip: 'ORDER_STATUS.PAYMENT_CANCELED_TOOLTIP',
  },

  // 🛠️ Обработка
  pending: {
    color: 'blue', // ожидание обработки
    title: 'ORDER_STATUS.PENDING',
    tooltip: 'ORDER_STATUS.PENDING_TOOLTIP',
  },
  inProgress: {
    color: 'blue', // сборка
    title: 'ORDER_STATUS.IN_PROGRESS',
    tooltip: 'ORDER_STATUS.IN_PROGRESS_TOOLTIP',
  },

  // 🚚 Доставка
  inDeliveryProcess: {
    color: 'yellow', // логистика
    title: 'ORDER_STATUS.IN_DELIVERY_PROCESS',
    tooltip: 'ORDER_STATUS.IN_DELIVERY_PROCESS_TOOLTIP',
  },

  // ✅ Финал
  delivered: {
    color: 'green', // доставлено
    title: 'ORDER_STATUS.DELIVERED',
    tooltip: 'ORDER_STATUS.DELIVERED_TOOLTIP',
  },
  refunded: {
    color: 'red', // возврат
    title: 'ORDER_STATUS.REFUNDED',
    tooltip: 'ORDER_STATUS.REFUNDED_TOOLTIP',
  },

  // (не используется?)
  canceled: {
    color: 'red',
    title: 'ORDER_STATUS.CANCELED',
    tooltip: 'ORDER_STATUS.CANCELED_TOOLTIP',
  },
};
