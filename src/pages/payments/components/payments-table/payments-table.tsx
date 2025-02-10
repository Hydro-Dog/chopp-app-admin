import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ChoppInfoModal, useInfiniteScroll, FETCH_STATUS, Payment } from '@shared/index';
import { fetchPayments, refundPayment } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { Table, Spin, Modal } from 'antd';
import { ACTION_MENU_ITEMS } from './enums';
import { useGetPaymentsTableColumns } from './hooks/use-get-payments-table-colums';
import { ActionValue } from './types';

export const PaymentsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, fetchPaymentsStatus } = useSelector((state: RootState) => state.payments || {});
  const { t } = useTranslation();
  const [list, setList] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPayments({}));
  }, []);

  useEffect(() => {
    if (payments?.items) {
      setList((prev) => [...prev, ...(payments.items || [])]);
    }
  }, [payments]);

  const handleInfoClick = (record: Payment) => {
    setSelectedPayment(record);
    setIsInfoModalOpen(true);
  };

  const handleRefundClick = (record: Payment) => {
    setSelectedPayment(record);
    setIsRefundModalOpen(true);
  };

  const handleRefundConfirm = () => {
    if (!selectedPayment) return;
    //TODO: Пройти по всем асинхронным запросам и добавить обработку ошибок.
    dispatch(refundPayment({ payment_id: selectedPayment.id, amount: selectedPayment.amount }));
    setIsRefundModalOpen(false);
    setSelectedPayment(null);
  };

  const handleLoadMore = () => {
    if (payments?.next_cursor && fetchPaymentsStatus !== FETCH_STATUS.LOADING) {
      dispatch(fetchPayments({ cursor: payments.next_cursor }));
    }
  };

  const { setObserverElement } = useInfiniteScroll({ callback: handleLoadMore });

  const map: Record<ACTION_MENU_ITEMS, (item: ActionValue) => void> = {
    [ACTION_MENU_ITEMS.INFO]: ({ record }) => {
      handleInfoClick(record);
      setIsInfoModalOpen(true);
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

      <ChoppInfoModal
        open={isInfoModalOpen}
        onOk={() => setIsInfoModalOpen(false)}
        value={selectedPayment || undefined}
      />

      <Modal
        open={isRefundModalOpen}
        title={t('CONFIRM_REFUND')}
        onOk={handleRefundConfirm}
        onCancel={() => setIsRefundModalOpen(false)}
        width={400}>
        {selectedPayment && (
          <p>
            {t('REFUND_AMOUNT')}:{' '}
            <strong>
              {selectedPayment.amount.value} {selectedPayment.amount.currency}
            </strong>
          </p>
        )}
      </Modal>
    </div>
  );
};
