import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { ConfirmModal } from '@shared/index';
import { FETCH_STATUS, fetchPayments, refundPayment } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { Descriptions, Spin, Table, TableColumnsType, Typography } from 'antd';
import { useInfiniteScroll } from '../../../../shared/hooks/use-infinite-scroll';

const { Text } = Typography;

type RefundModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount?: { value: string; currency: string };
};

export const RefundModal: React.FC<RefundModalProps> = ({ open, onClose, onConfirm, amount }) => {
  return (
    <ConfirmModal
      open={open}
      title="Confirm Refund"
      onOk={onConfirm}
      onCancel={onClose}
      okTitle="Ok"
      width={400}>
      <Text>
        You are about to refund the customer an amount of{' '}
        <strong>
          {amount?.value} {amount?.currency}
        </strong>
        .
      </Text>
    </ConfirmModal>
  );
};

type PaymentDetailsProps = {
  data?: Record<string, any>;
  open: boolean;
  onClose: () => void;
};

export const PaymentDetailsModal: React.FC<PaymentDetailsProps> = ({ data, open, onClose }) => {
  return (
    <ConfirmModal
      open={open}
      title={`Payment Details - ID: ${data?.id || 'Unknown'}`}
      onOk={onClose}
      onCancel={onClose}
      okTitle="Close"
      width={600}>
      <Descriptions column={1} bordered size="small">
        {Object.entries(data || {}).map(([key, value]) => (
          <Descriptions.Item label={key} key={key}>
            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </ConfirmModal>
  );
};

export const PaymentsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, fetchPaymentsStatus } = useSelector((state: RootState) => state.payments || {});
  const [list, setList] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPayments({}));
  }, [dispatch]);

  useEffect(() => {
    if (payments?.items) {
      setList((prev) => [...prev, ...payments.items]);
    }
  }, [payments]);

  const handleDetailsClick = (record: any) => {
    setSelectedPayment(record);
    setIsDetailsModalOpen(true);
  };

  const handleRefundClick = (record: any) => {
    setSelectedPayment(record);
    setIsRefundModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleRefundModalClose = () => {
    setIsRefundModalOpen(false);
    setSelectedPayment(null);
  };

  console.log('selectedPayment: ', selectedPayment);
  const handleRefundConfirm = () => {
    setIsRefundModalOpen(false);

    dispatch(
      refundPayment({
        payment_id: selectedPayment.id,
        amount: selectedPayment.amount,
      }),
    );
    setSelectedPayment(null);
  };

  const handleLoadMore = () => {
    if (payments?.next_cursor && fetchPaymentsStatus !== FETCH_STATUS.LOADING) {
      dispatch(fetchPayments({ cursor: payments.next_cursor }));
    }
  };

  const { setObserverElement } = useInfiniteScroll({ callback: handleLoadMore });

  const columns: TableColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
      render: (paid: boolean) => (paid ? 'Yes' : 'No'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: { value: string; currency: string }) => `${amount.value} ${amount.currency}`,
    },
    {
      title: 'Refunded amount',
      dataIndex: 'refunded_amount',
      key: 'refunded_amount',
      render: (amount: { value: string; currency: string }) =>
        `${amount?.value} ${amount?.currency}`,
    },

    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => {
        return (
          <>
            <IconButton onClick={() => handleDetailsClick(record)}>
              <InfoIcon />
            </IconButton>
            <IconButton disabled={!record?.refundable} onClick={() => handleRefundClick(record)}>
              <CurrencyExchangeIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        size="middle"
        columns={columns}
        dataSource={list}
        // loading={fetchPaymentsStatus === FETCH_STATUS.LOADING}
        rowKey="id"
        pagination={false}
      />
      <div ref={setObserverElement} style={{ height: '1px' }} />
      {fetchPaymentsStatus === FETCH_STATUS.LOADING && <Spin size="small" />}

      <PaymentDetailsModal
        data={selectedPayment}
        open={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
      />
      <RefundModal
        open={isRefundModalOpen}
        onClose={handleRefundModalClose}
        onConfirm={handleRefundConfirm}
        amount={selectedPayment?.amount}
      />
    </>
  );
};
