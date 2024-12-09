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
            <Col>{t('PRICING_PAGE.DELIVERY_OPTIONS')}</Col>
            <Col>
              {!isEditing ? (
                <Button type="primary" onClick={handleEdit}>
                  {t('EDIT')}
                </Button>
              ) : (
                <Space>
                  <Button onClick={handleCancel}>{t('CANCEL')}</Button>
                  <Button type="primary" onClick={handleSave}>
                    {t('SAVE')}
                  </Button>
                </Space>
              )}
            </Col>
          </Row>
        }>
        <Form layout="vertical" size="large">
          <Form.Item label={<span>{t('PRICING_PAGE.AVERAGE_COST')}</span>}>
            <Tooltip title={t('PRICING_PAGE.DELIVERY_COMMENT')}>
              <InputNumber
                min={0}
                style={{ width: '30%' }}
                placeholder={t('PRICING_PAGE.ENTER_PRICE')}
                disabled={!isEditing}
              />
            </Tooltip>
          </Form.Item>
          <Alert
            type="info"
            message={t('PRICING_PAGE.PRICE_COMMENT')}
            showIcon
            style={{ marginBottom: 16, width: '30%' }}
          />
          <Form.Item>
            <Checkbox disabled={!isEditing}>{t('PRICING_PAGE.FREE_SHIPPING')}</Checkbox>
          </Form.Item>

          <Form.Item label={<span>{t('PRICE')}</span>}>
            <Tooltip title={t('PRICING_PAGE.PRICE_DELIVERY')}>
              <InputNumber
                min={0}
                style={{ width: '30%' }}
                placeholder={t('PRICING_PAGE.ENTER_PRICE')}
                disabled={!isEditing}
              />
            </Tooltip>
          </Form.Item>
        </Form>
      </Card>
    </TitlePage>
  );
};
