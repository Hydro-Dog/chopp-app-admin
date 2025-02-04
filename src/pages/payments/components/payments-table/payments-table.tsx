import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { ChoppPaymentStatus, ConfirmModal, PAYMENT_STATUS } from '@shared/index';
import { Payment } from '@shared/types/payment';
import { FETCH_STATUS, fetchPayments, refundPayment } from '@store/index';
import { AppDispatch, RootState } from '@store/store';
import { Descriptions, Spin, Table, TableColumnsType, Typography, Tag, Tooltip } from 'antd';
import Checkbox from 'antd/lib/checkbox';
import { PAYMENT_STATUS_MAP } from '../../../../shared/constants';
import { useInfiniteScroll } from '../../../../shared/hooks/use-infinite-scroll';
import { InfoCircleOutlined, RetweetOutlined, UndoOutlined } from '@ant-design/icons';

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
  data: Record<string, unknown> | null;
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
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { payments, fetchPaymentsStatus } = useSelector((state: RootState) => state.payments || {});
  const [list, setList] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPayments({}));
  }, [dispatch]);

  useEffect(() => {
    const staticData = [
      {
        id: '1',
        status: t('ORDER_STATUS.PROCESSING'),
        paid: 'X',
        amount: { value: '100.00', currency: 'RUB' },
        refunded_amount: { value: '0.00', currency: 'RUB' },
        created_at: '2025-10-01',
        description: 'ТЕСТ 1',
        refundable: true,
      },
      {
        id: '2',
        status: t('SUCCESS'),
        paid: '✓',
        amount: { value: '200.00', currency: 'RUB' },
        refunded_amount: { value: '0.00', currency: 'RUB' },
        created_at: '2025-10-02',
        description: 'ТЕСТ 2',
        refundable: false,
      },
      {
        id: '3',
        status: t('ORDER_STATUS.CANCELED'),
        paid: 'X',
        amount: { value: '300.00', currency: 'RUB' },
        refunded_amount: { value: '0.00', currency: 'RUB' },
        created_at: '2025-10-03',
        description: 'ТЕСТ 33333333333333333333333333333333333333333333333333333333333333333',
        refundable: false,
      },
    ];
    setList(staticData);
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

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleRefundModalClose = () => {
    setIsRefundModalOpen(false);
    setSelectedPayment(null);
  };

  const handleRefundConfirm = () => {
    setIsRefundModalOpen(false);

    dispatch(
      refundPayment({
        payment_id: selectedPayment!.id,
        amount: selectedPayment!.amount,
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

  const columns: TableColumnsType<Payment> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('PAYMENT_STATUS_TITLE'),
      dataIndex: 'status',
      key: 'status',
      render: (status: PAYMENT_STATUS) => <ChoppPaymentStatus status={status} />,
    },
    {
      title: t('PAID'),
      dataIndex: 'paid',
      key: 'paid',
      render: (paid: boolean) => <Checkbox checked={paid} />,
    },
    {
      title: t('AMOUNT'),
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: { value: string; currency: string }) =>
        Number(amount.value)?.toLocaleString('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        }),
    },
    {
      title: t('REFUND_AMOUNT'),
      dataIndex: 'refunded_amount',
      key: 'refunded_amount',
      render: (amount: { value: string; currency: string }) =>
        Number(amount?.value)?.toLocaleString('ru-RU', {
          style: 'currency',
          currency: 'RUB',
        }),
    },
    {
      title: t('CREATED_AT'),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: t('DESCRIPTION'),
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <Tooltip title={description}>
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '200px',
            }}>
            {description}
          </div>
        </Tooltip>
      ),
    },
    //TODO: сделать котонку Actions по аналогии с ordersTable
    {
      title: t('ACTIONS'),
      key: 'actions',
      render: (_: any, record: Payment) => {
        return (
          <>
            <IconButton onClick={() => handleDetailsClick(record)}>
              <Tooltip title={t('INFO')}>
                <InfoCircleOutlined />
              </Tooltip>
            </IconButton>
            <IconButton disabled={!record?.refundable} onClick={() => handleRefundClick(record)}>
              <Tooltip title={t('REFUND')}>
                <UndoOutlined />
              </Tooltip>
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table size="small" columns={columns} dataSource={list} rowKey="id" pagination={false} />
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
