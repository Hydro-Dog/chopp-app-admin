import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, TimePicker } from 'antd';
import { Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';
import { useSetTimeSchema } from '../hooks';
const { Item } = Form;

type Props = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<SetStateAction<string[]>>;
  time: string[];
};

export const TimeForm = ({ time, setEditMode, setTime }: Props) => {
  const setTimeSchema = useSetTimeSchema();
  type setTimeSchemaFormType = z.infer<typeof setTimeSchema>;
  const { t } = useTranslation();

  const onSubmit = (data: setTimeSchemaFormType) => {
    if (data.timeRange !== null) setTime(data.timeRange as string[]);
    else setTime(['', '']);
    setEditMode(false);
  };

  const changeTime = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setValue('timeRange', dates.map((date) => date?.format('HH:mm') || '') as [string, string]);
    } else {
      setValue('timeRange', null);
    }
  };

  const handleCancel = () => {
    reset({
      timeRange: null,
    });
    setEditMode(false);
  };

  const { handleSubmit, control, reset, setValue } = useForm<setTimeSchemaFormType>({
    resolver: zodResolver(setTimeSchema),
    defaultValues: {
      timeRange: time[0] ? (time as [string, string]) : null,
    },
  });
  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div>
          <Item>
            <Controller
              name="timeRange"
              control={control}
              render={() => (
                <TimePicker.RangePicker
                  placeholder={[t('ORDERS_PAGE.START_DATE'), t('ORDERS_PAGE.END_DATE')]}
                  onChange={changeTime}
                  format="HH:mm"
                  defaultValue={[
                    time[0] ? dayjs(time[0], 'HH:mm') : null,
                    time[1] ? dayjs(time[1], 'HH:mm') : null,
                  ]}
                />
              )}
            />
          </Item>
        </div>
        <div className="flex gap-3">
          <Button className="mt-5" onClick={handleCancel}>
            {t('CANCEL')}
          </Button>
          <Button className="mt-5" type="primary" onClick={handleSubmit(onSubmit)}>
            {t('SAVE')}
          </Button>
        </div>
      </div>
    </Form>
  );
};
