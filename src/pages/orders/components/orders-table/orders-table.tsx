import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { ErrorResponse, Order, PaginationQuery, PaginationResponse } from '@shared/types';
import { AppDispatch, CallsTableRecord } from '@store/index'; // Update the path as necessary
import { Table } from 'antd';

import { Tooltip, Tag } from 'antd';
import dayjs from 'dayjs';

type FetchDataFunction = (
  params: PaginationQuery,
) => AsyncThunkAction<PaginationResponse<Order>, PaginationQuery, { rejectValue: ErrorResponse }>;

type Props = {
  fetchData: FetchDataFunction;
  data?: PaginationResponse<Order>;
};

export const OrdersTable = ({ data }: Props) => {
  console.log('data: ', data)
  const { t } = useTranslation();

  const columns = [
    {
      title: t('DATE'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      className: 'cursor-pointer',
      render: (text: string) => dayjs(text).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: t('ORDER ID'),
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      className: 'cursor-pointer',
      render: (text: number) => <span>{text}</span>,
    },
    {
      title: t('TOTAL PRICE'),
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      sorter: true,
      className: 'cursor-pointer',
      render: (text: number) => (
        <span>
          {text?.toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB',
          })}
        </span>
      ),
    },
    {
      title: t('QUANTITY'),
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: true,
      className: 'cursor-pointer',
      render: (text: number) => <span>{text}</span>,
    },
    {
      title: t('ORDER STATUS'),
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      sorter: true,
      className: 'cursor-pointer',
      render: (text: string) => (
        <Tooltip title={text}>
          <Tag style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {t(`ORDER_STATUS.${text?.toUpperCase()}`)}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: t('PAYMENT STATUS'),
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      sorter: true,
      className: 'cursor-pointer',
      render: (text: string) => (
        <Tooltip title={text}>
          <Tag style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {t(`PAYMENT_STATUS.${text?.toUpperCase()}`)}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: t('TRANSACTION ID'),
      dataIndex: 'transactionId',
      key: 'transactionId',
      className: 'cursor-pointer',
      render: (text: string) => (
        <Tooltip title={text}>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {text}
          </span>
        </Tooltip>
      ),
    },
  ];

  return (
    <Table className="!p-0" size="small" columns={columns} dataSource={data?.items} rowKey="id" />
  );
};
