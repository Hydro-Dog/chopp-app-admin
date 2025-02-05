import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spin } from 'antd';
import { ConfirmModal, ChoppInfoModal } from '@shared/index';
import IconButton from '@mui/material/IconButton';
import { ChoppPaymentStatus, ConfirmModal, FETCH_STATUS, PAYMENT_STATUS } from '@shared/index';
import { Payment } from '@shared/types/payment';
import { fetchPayments, refundPayment } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { useInfiniteScroll } from '../../../../shared/hooks/use-infinite-scroll';
import { useGetPaymentsTableColumns } from './hooks/use-get-payments-table-colums';
import { useTranslation } from 'react-i18next';
import { Descriptions, Spin, Table, TableColumnsType, Typography, Tooltip } from 'antd';
import Checkbox from 'antd/lib/checkbox';
import { useInfiniteScroll } from '../../../../shared/hooks/use-infinite-scroll';
import { InfoCircleOutlined, UndoOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const PaymentsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, fetchPaymentsStatus } = useSelector((state: RootState) => state.payments || {});
  const { t } = useTranslation();
  const [list, setList] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPayments({}));
  }, []);

  useEffect(() => {
    if (payments?.items) {
      setList((prev) => [...prev, ...(payments.items || [])]);
    }
  }, [payments]);

  const handleDetailsClick = (record: Payment) => {
    setSelectedPayment(record);
    setIsDetailsModalOpen(true);
  };

  const handleRefundClick = (record: Payment) => {
    setSelectedPayment(record);
    setIsRefundModalOpen(true);
  };

  const handleRefundConfirm = () => {
    if (!selectedPayment) return;
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

  const handleActionClick = (key: string, record: Payment) => {
    if (key === 'details') handleDetailsClick(record);
    if (key === 'refund') handleRefundClick(record);
  };

  const { columns } = useGetPaymentsTableColumns({ onActionClick: handleActionClick });

  return (
    <div>
      <Table size="small" columns={columns} dataSource={list} rowKey="id" pagination={false} />
      <div ref={setObserverElement} style={{ height: '1px' }} />
      {fetchPaymentsStatus === FETCH_STATUS.LOADING && <Spin size="small" />}

      <ChoppInfoModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        value={selectedPayment || undefined}
      />

      <ConfirmModal
        open={isRefundModalOpen}
        title={t('CONFIRM_REFUND')}
        onOk={handleRefundConfirm}
        onCancel={() => setIsRefundModalOpen(false)}
        okTitle="OK"
        width={400}>
        {selectedPayment && (
          <p>
            {t('REFUND_AMOUNT')}:{' '}
            <strong>
              {selectedPayment.amount.value} {selectedPayment.amount.currency}
            </strong>
          </p>
        )}
      </ConfirmModal>
    </div>
  );
};
