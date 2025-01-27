import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Form, Input, Tooltip, Button, Space } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

export const PaymentSettingsEditForm = () => {
  const { register, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });
  const { t } = useTranslation();
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleCancel = () => {
    reset();
  };
  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label={
          <span>
            Shop Id&nbsp;
            <Tooltip title="Id вашего магазина в 'ЮКассе'">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          </span>
        }>
        <Input
          {...register('shopId', { required: 'Shop Id is required' })}
          placeholder="Введите Shop Id"
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button onClick={handleCancel}>{t('CANCEL')}</Button>
          <Button type="primary">{t('SAVE')}</Button>
          <Button type="primary">{t('EDIT')}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
