import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { usePaymentsContext } from '@pages/payments/context';
import {
  ChoppInfoModal,
  useInfiniteScroll,
  FETCH_STATUS,
  Payment,
  useSuperDispatch,
} from '@shared/index';
import { fetchPayments, refundPayment } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { Table, Spin, Modal, Flex, Alert } from 'antd';
import dayjs from 'dayjs';
import { useBoolean } from 'usehooks-ts';
import { PaymentDetailsModal } from './components/payment-details-modal';
import { ACTION_MENU_ITEMS } from './enums';
import { useGetPaymentsTableColumns } from './hooks/use-get-payments-table-colums';
import { ActionValue } from './types';

export const PaymentsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, fetchPaymentsStatus } = useSelector((state: RootState) => state.payments || {});
  const { t } = useTranslation();
  const { startDate, endDate, status, list, payment_id, setList } = usePaymentsContext();
  const [selectedPayment, setSelectedPayment] = useState<Payment>();
  const {
    value: isInfoModalOpened,
    setTrue: openInfoModal,
    setFalse: closeInfoModal,
  } = useBoolean();
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  useEffect(() => {
    setList([]);

    const searchRequest: Record<string, string> = {};
    if (startDate) {
      searchRequest['created_at.gte'] = dayjs(startDate, 'DD.MM.YYYY').toISOString();
    }
    if (endDate) {
      searchRequest['created_at.lte'] = dayjs(endDate, 'DD.MM.YYYY').toISOString();
    }
    if (status) {
      searchRequest['status'] = status;
    }
    if (payment_id) {
      searchRequest['payment_id'] = payment_id;
    }

    dispatch(fetchPayments(searchRequest));
  }, [startDate, endDate, status, payment_id, dispatch, setList]);
  useEffect(() => {
    if (payments?.items) {
      setList((prev) => [...prev, ...(payments.items || [])]);
    }
  }, [payments, setList]);

  const handleInfoClick = (record: Payment) => {
    setSelectedPayment(record);
    openInfoModal();
  };

  const handleRefundClick = (record: Payment) => {
    setSelectedPayment(record);
    setIsRefundModalOpen(true);
  };

  const { superDispatch } = useSuperDispatch<any, any>();

  const handleRefundConfirm = () => {
    if (!selectedPayment) return;
    superDispatch({
      action: refundPayment({ payment_id: selectedPayment.id, amount: selectedPayment.amount }),
      thenHandler: (response) => {
        console.log('response?.id: ', response)
        if (!response?.id) return;

        // Обновляем вручную list через setList
        setList((prev) =>
          prev.map((payment) =>
            payment.id === response.payment_id
              ? {
                  ...payment,
                  refundable: false,
                  refunded_amount: {
                    value: response.amount.value,
                    currency: response.amount.currency,
                  },
                }
              : payment,
          ),
        );
      },
    });

    setIsRefundModalOpen(false);
    setSelectedPayment(undefined);
  };

  const handleLoadMore = () => {
    if (payments?.next_cursor && fetchPaymentsStatus !== FETCH_STATUS.LOADING) {
      const searchRequest: Record<string, string> = {};
      if (startDate) {
        searchRequest['created_at.gte'] = dayjs(startDate, 'DD.MM.YYYY').toISOString();
      }
      if (endDate) {
        searchRequest['created_at.lte'] = dayjs(endDate, 'DD.MM.YYYY').toISOString();
      }
      if (status) {
        searchRequest.status = status;
      }
      if (payment_id) {
        searchRequest.payment_id = payment_id;
      }

      dispatch(fetchPayments({ ...searchRequest, cursor: payments.next_cursor }));
    }
  };

  const { setObserverElement } = useInfiniteScroll({ callback: handleLoadMore });

  const map: Record<ACTION_MENU_ITEMS, (item: ActionValue) => void> = {
    [ACTION_MENU_ITEMS.INFO]: ({ record }) => {
      handleInfoClick(record);
      openInfoModal();
    },
    [ACTION_MENU_ITEMS.REFUND]: ({ record }) => {
      handleRefundClick(record);
      setIsRefundModalOpen(true);
    },
  };

  const onActionClick = (action: ActionValue) => {
    map[action.key](action);
  };

  const { columns } = useGetPaymentsTableColumns({ onActionClick });

  return (
    <div>
      <Table size="small" columns={columns} dataSource={list} rowKey="id" pagination={false} />
      <div ref={setObserverElement} style={{ height: '1px' }} />

      {fetchPaymentsStatus === FETCH_STATUS.LOADING && <Spin size="small" />}

      <PaymentDetailsModal
        open={isInfoModalOpened}
        onOk={closeInfoModal}
        payment={selectedPayment}
      />

      <Modal
        open={isRefundModalOpen}
        title={t('CONFIRM_REFUND')}
        onOk={handleRefundConfirm}
        onCancel={() => setIsRefundModalOpen(false)}>
        {selectedPayment && (
          <Flex gap={8} vertical>
            <Flex gap={8}>
              {t('REFUND_AMOUNT')}:
              <strong>
                {selectedPayment.amount.value} {selectedPayment.amount.currency}
              </strong>
            </Flex>
            <Alert
              message={t('WARNING')}
              description={t('REFUND_WARNING')}
              type="warning"
              showIcon
              closable
            />
          </Flex>
        )}
      </Modal>
    </div>
  );
};
