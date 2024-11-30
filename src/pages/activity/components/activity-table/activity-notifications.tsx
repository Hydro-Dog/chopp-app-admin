import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  ConfirmChangeStatusModal,
  RecordDetailsModal,
} from '@shared/components/calls-table/components';
import { ChangeStatusType } from '@shared/components/calls-table/types';
import { useNotificationContext } from '@shared/context';
import { ACTIVITY_STATUS } from '@shared/enum';
import { useFilterWsMessages, useConnection } from '@shared/hooks';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { createWsMessage } from '@shared/utils';
import { AppDispatch } from '@store/index';
import { CallsTableRecord, updateCallStatus, wsSend } from '@store/slices';
import { Button } from 'antd';
import { useBoolean } from 'usehooks-ts';

export const ActivityNotifications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { showNotification, closeNotification } = useNotificationContext();

  const [detailsModalData, setDetailsModalData] = useState<CallsTableRecord>();
  const [changeStatusModalData, setChangeStatusModalData] = useState<ChangeStatusType>();

  const {
    value: isRecordDetailsModalOpen,
    setTrue: openRecordDetailsModal,
    setFalse: closeRecordDetailsModal,
  } = useBoolean();
  const {
    value: isConfirmStatusModalOpen,
    setTrue: openConfirmStatusModal,
    setFalse: closeConfirmStatusModal,
  } = useBoolean();

  const { lastMessage: newActivityMessage } = useFilterWsMessages<CallsTableRecord>(
    WS_MESSAGE_TYPE.NEW_ACTIVITY,
  );

  useEffect(() => {
    if (newActivityMessage) {
      showNotification({
        type: 'info',
        key: newActivityMessage.payload?.id,
        message: t('NEW_ACTIVITY'),
        description: (
          <div className="flex flex-row justify-between items-center">
            <div>{newActivityMessage.payload?.address}</div>
            <Button
              type="primary"
              onClick={() => {
                setDetailsModalData(newActivityMessage.payload);
                openRecordDetailsModal();
                closeNotification(newActivityMessage.payload?.id);
              }}>
              {t('OPEN')}
            </Button>
          </div>
        ),
      });
    }
  }, [newActivityMessage]);

  useConnection(() => {
    console.log('useConnection');
    dispatch(
      wsSend(
        createWsMessage({
          type: WS_MESSAGE_TYPE.GET_NEW_ACTIVITY,
        }),
      ),
    );
  }, [dispatch]);

  const updateStatus = (id = '', newStatus?: ACTIVITY_STATUS) => {
    if (id && newStatus) {
      dispatch(updateCallStatus({ id, newStatus })).then(() => {
        // TODO: Проблема - как обновть таблицу после отправки updateCallStatus, когда мы делаем это из ActivityNotifications
        // dispatch(
        //   fetchCallHistory({
        //     search: searchParams?.search,
        //     page: searchParams?.pagination.current,
        //     limit: searchParams?.pagination.pageSize,
        //     userId: id,
        //     sort: searchParams?.sorter.field,
        //     order: searchParams?.sorter.order
        //       ? searchParams.sorter.order === 'ascend'
        //         ? 'asc'
        //         : 'desc'
        //       : undefined,
        //   }),
        // );
      });
    }
  };

  //TODO: все что связано с модалками копипаста из CallsTable, выделить в отдельный файл?

  return (
    <>
      <RecordDetailsModal
        data={detailsModalData}
        open={isRecordDetailsModalOpen}
        currentStatus={detailsModalData?.status}
        onOk={() => {
          closeRecordDetailsModal();
          setDetailsModalData(undefined);
        }}
        onCancel={() => {
          closeRecordDetailsModal();
          setDetailsModalData(undefined);
        }}
        onStatusChange={(newStatus) => {
          setChangeStatusModalData({ item: detailsModalData!, newStatus: newStatus! });
          openConfirmStatusModal();
        }}
      />

      <ConfirmChangeStatusModal
        data={changeStatusModalData}
        open={isConfirmStatusModalOpen}
        onOk={() => {
          updateStatus(changeStatusModalData?.item.id, changeStatusModalData?.newStatus);
          closeConfirmStatusModal();
          setChangeStatusModalData(undefined);
        }}
        onCancel={() => {
          closeConfirmStatusModal();
          setChangeStatusModalData(undefined);
        }}
      />
    </>
  );
};
