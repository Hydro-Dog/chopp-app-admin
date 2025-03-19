import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNotificationContext } from '@shared/context';
import { postClientAppConfig } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { Form, TimePicker } from 'antd';
import { Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';
import { useSetWorkingHoursSchema } from '../hooks';
const { Item } = Form;

type Props = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const WorkingHoursForm = ({ setEditMode }: Props) => {
  const workingHoursSchema = useSetWorkingHoursSchema();
  type setTimeSchemaFormType = z.infer<typeof workingHoursSchema>;

  const { t } = useTranslation();
  const { clientAppConfigData } = useSelector((state: RootState) => state.clientAppConfig);
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorNotification } = useNotificationContext();

  const onSubmit: SubmitHandler<setTimeSchemaFormType> = (data) => {
    if (
      data.openTime !== clientAppConfigData?.openTime ||
      data.closeTime !== clientAppConfigData?.closeTime
    ) {
      dispatch(
        postClientAppConfig({
          ...clientAppConfigData,
          openTime: data.openTime ? data.openTime : '',
          closeTime: data.closeTime ? data.closeTime : '',
        }),
      )
        .unwrap()
        .catch((error) => {
          showErrorNotification({
            message: t('ERROR'),
            description: error.message,
          });
        });
    }
    setEditMode(false);
  };

  const changeTime = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setValue('openTime', dates?.[0]?.format('HH:mm'));
      setValue('closeTime', dates?.[1]?.format('HH:mm'));
    } else {
      setValue('openTime', null);
      setValue('closeTime', null);
    }
  };

  const handleCancel = () => {
    reset({
      openTime: null,
      closeTime: null,
    });
    setEditMode(false);
  };

  const { handleSubmit, reset, setValue } = useForm<setTimeSchemaFormType>({
    resolver: zodResolver(workingHoursSchema),
    defaultValues: {
      openTime: clientAppConfigData?.openTime ? clientAppConfigData?.openTime : null,
      closeTime: clientAppConfigData?.closeTime ? clientAppConfigData.closeTime : null,
    },
  });
  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <Item>
          <TimePicker.RangePicker
            placeholder={[t('ORDERS_PAGE.START_DATE'), t('ORDERS_PAGE.END_DATE')]}
            onChange={changeTime}
            format="HH:mm"
            defaultValue={[
              clientAppConfigData?.openTime ? dayjs(clientAppConfigData.openTime, 'HH:mm') : null,
              clientAppConfigData?.closeTime ? dayjs(clientAppConfigData.closeTime, 'HH:mm') : null,
            ]}
          />
        </Item>
        <div className="flex gap-3">
          <Button onClick={handleCancel}>{t('CANCEL')}</Button>
          <Button type="primary" htmlType="submit">
            {t('SAVE')}
          </Button>
        </div>
      </div>
    </Form>
  );
};
