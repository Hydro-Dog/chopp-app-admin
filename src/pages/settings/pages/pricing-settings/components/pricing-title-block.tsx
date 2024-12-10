import { useTranslation } from 'react-i18next';
import { Button, Col, Row, Space } from 'antd';

type Props = {
  isEditing: boolean;
  toggleEditMode: () => void;
};
export const PricingTitleBlock = ({ isEditing, toggleEditMode }: Props) => {
  const { t } = useTranslation();

  return (
    <Row className="w-full" justify="space-between" align="middle">
      <Col>{t('DELIVERY_OPTIONS')}</Col>
      <Col>
        {isEditing ? (
          <Space>
            <Button onClick={toggleEditMode}>{t('CANCEL')}</Button>
            <Button type="primary" onClick={toggleEditMode}>
              {t('SAVE')}
            </Button>
          </Space>
        ) : (
          <Button type="primary" onClick={toggleEditMode}>
            {t('EDIT')}
          </Button>
        )}
      </Col>
    </Row>
  );
};
