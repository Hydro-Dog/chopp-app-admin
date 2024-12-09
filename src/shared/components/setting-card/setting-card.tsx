/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Card, Button, Space, Row, Col } from 'antd';

interface ISettingCardComponentProps {
  cardTitle: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  editChildren: ReactElement<any, string | JSXElementConstructor<any>>;
  viewChildren: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const SettingCardComponent = ({
  cardTitle,
  onEdit,
  onSave,
  onCancel,
  editChildren,
  viewChildren,
}: ISettingCardComponentProps) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    onEdit();
    setIsEditing(true);
  };
  const handleCancel = () => {
    onCancel();
    setIsEditing(false);
  };
  const handleSave = () => {
    onSave();
    setIsEditing(false);
  };

  return (
    <Card
      title={
        <Row justify="space-between" align="middle">
          <Col>{cardTitle}</Col>
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
        {isEditing ? editChildren : viewChildren}
      </Form>
    </Card>
  );
};
