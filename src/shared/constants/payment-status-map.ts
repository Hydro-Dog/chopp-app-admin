export const PAYMENT_STATUS_MAP = {
  pending: {
    color: 'default',
    title: 'PAYMENT_STATUS.PENDING',
    tooltip: 'PAYMENT_STATUS.PENDING_TOOLTIP',
  },
  waiting_for_capture: {
    color: 'blue',
    title: 'PAYMENT_STATUS.WAITING_FOR_CAPTURE',
    tooltip: 'PAYMENT_STATUS.WAITING_FOR_CAPTURE_TOOLTIP',
  },
  succeeded: {
    color: 'green',
    title: 'PAYMENT_STATUS.SUCCEEDED',
    tooltip: 'PAYMENT_STATUS.SUCCEEDED_TOOLTIP',
  },
  canceled: {
    color: 'red',
    title: 'PAYMENT_STATUS.CANCELED',
    tooltip: 'PAYMENT_STATUS.CANCELED_TOOLTIP',
  },
};
