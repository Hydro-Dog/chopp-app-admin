/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSXElementConstructor, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Card, Button, Space, Row, Col, Flex } from 'antd';
import { useBoolean } from 'usehooks-ts';

type Props = {
  cardTitle: string;
  editChildren: ReactElement<any, string | JSXElementConstructor<any>>;
  viewChildren: ReactElement<any, string | JSXElementConstructor<any>>;
};

export const SettingCardComponent = ({ cardTitle, editChildren, viewChildren }: Props) => {
  const { t } = useTranslation();
  const { value: isEditing, setTrue: handleEdit, setFalse: handleCancel } = useBoolean();

  return (
    <Card
      title={
        <Flex justify="space-between" align="middle">
          <Col>{cardTitle}</Col>
          <Col>
            {!isEditing ? (
              <Button type="primary" onClick={handleEdit}>
                {t('EDIT')}
              </Button>
            ) : (
              <Space>
                <Button onClick={handleCancel}>{t('CANCEL')}</Button>
                <Button type="primary" onClick={handleCancel}>
                  {t('SAVE')}
                </Button>
              </Space>
            )}
          </Col>
        </Flex>
      }>
      <Form layout="vertical" size="large">
        {isEditing ? editChildren : viewChildren}
      </Form>
    </Card>
  );
};
