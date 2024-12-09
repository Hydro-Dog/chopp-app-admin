import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/index';
import { InputNumber, Checkbox, Tooltip, Alert, Form, Card, Button, Space, Row, Col } from 'antd';

export const PricingSettingsPage = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <TitlePage title={t('PRICING')}>
      <Card
        title={
          <Row justify="space-between" align="middle">
            <Col>{t('Настройки доставки')}</Col>
            <Col>
              {!isEditing ? (
                <Button type="primary" onClick={handleEdit}>
                  Редактировать
                </Button>
              ) : (
                <Space>
                  <Button onClick={handleCancel}>Отмена</Button>
                  <Button type="primary" onClick={handleSave}>
                    Сохранить
                  </Button>
                </Space>
              )}
            </Col>
          </Row>
        }>
        <Form layout="vertical" size="large">
          <Form.Item label={<span>Средняя стоимость доставки </span>}>
            <Tooltip title="При оформлении заказа клиент увидит эту сумму в поле 'Средняя стоимость доставки'. Если сумма не указана, пользователь не будет проинформирован о стоимости доставки.">
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Введите сумму"
                disabled={!isEditing}
              />
            </Tooltip>
          </Form.Item>
          <Alert
            type="info"
            message="Вы можете указать сумму заказа, с которой начинается бесплатная доставка."
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Form.Item>
            <Checkbox disabled={!isEditing}>Бесплатная доставка включена</Checkbox>
          </Form.Item>

          <Form.Item label={<span>Сумма </span>}>
            <Tooltip title="Если заказ превышает эту сумму, то доставка бесплатная.">
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Введите сумму"
                disabled={!isEditing}
              />
            </Tooltip>
          </Form.Item>
        </Form>
      </Card>
    </TitlePage>
  );
};
